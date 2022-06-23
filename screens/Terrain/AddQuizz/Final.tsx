import { RootStackParamList, RootTabScreenProps, TerrainTabScreenProps } from "../../../types";
import { Image, StyleSheet, Text, View } from "react-native";
import { Background } from "../../../components/Background";
import { Header } from "../../../components/Header";
import { Title } from "../../../components/Texts/Title";
import ChatBox from "../../../components/Chat/ChatBox";
import Chat from "../../../components/Chat/Chat";

import * as Store from 'expo-secure-store'
import { useEffect, useState } from "react";
import Layout from "../../../constants/Layout";
import Button from "../../../components/Chat/Button";
import * as ImageManipulator from 'expo-image-manipulator'

export default function Final({ navigation }: RootTabScreenProps<'Home'>) {

  const [picture, setPicture] = useState("")
  const [areas_nb, setAreas_nb] = useState(0)
  const [area_surface, setArea_surface] = useState("")
  const [activity, setActivity] = useState(false)
  const [area, setArea] = useState('')

  const surfaces = ['sable', 'herbe', 'béton', 'interieur']

  useEffect(() => {
    async function loadData() {
      let area = await Store.getItemAsync('new_area');
      if (!area) return;

      const json = JSON.parse(area)
      setPicture(json.photo.uri)
      setAreas_nb(json.areas_nb)
      setArea_surface(surfaces[json.area_surface - 1])
      setArea(area)
    }
    loadData()
  });

  const cancel = () => {
    navigation.goBack()
  }

  const publish = async () => {
    setActivity(true)
    const manipulatorResult = await ImageManipulator.manipulateAsync(picture, [
      {
        resize: {
          height: 600,
          width: 800,
        }
      }
    ], {
      base64: true,
      compress: 1
    })
    const base64 = manipulatorResult.base64
    const json = JSON.parse(area)
    const data = {
      "latitude": json.latitude,
      "longitude": json.longitude,
      "area_surface": json.area_surface,
      "areas_nb": json.areas_nb,
      "image_data" : base64
    }
    
    const userToken = await Store.getItemAsync('jwt')
    const userTokenString = JSON.parse(userToken || "")

    let headers = new Headers();
    headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
    headers.append("user-token", userTokenString);
    headers.append("Content-Type", "application/json");

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }

    fetch("https://dev.govolley.fr/area", options)
      .then(response => response.text())
      .then((result) => navigation.navigate('Home'))
      .catch(error => console.log('error', error))
  }

  if (!areas_nb || !picture || !area_surface) return null
  else return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title style={{ marginTop: 25 }} big={true}>Ajouter un terrain</Title>
      <Image source={{ uri: picture}} style={styles.picture} />
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Vous allez signaler la présence de <Text style={styles.bright}>{areas_nb} terrain{areas_nb > 1 ? 's':''}</Text> {area_surface == 'interieur' ? 'en':'sur'} <Text style={styles.bright}>{area_surface}</Text> situé{areas_nb > 1 ? 's':''} à votre <Text style={styles.bright}>emplacement actuel</Text>.</Chat>
        <Button text="Tout est bon" activity={activity} onPress={publish} />
      </ChatBox>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: (Layout.window.width-70),
    height: ((Layout.window.width-70) * 0.75),
    borderRadius: 15,
    marginTop: 25,
  },
  bright: {
    color: '#FCB040'
  }
});