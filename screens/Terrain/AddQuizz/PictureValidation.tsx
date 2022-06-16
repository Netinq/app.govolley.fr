import { QuizzTabParamList, RootStackParamList, TerrainTabScreenProps } from "../../../types";
import { Image, StyleSheet, View } from "react-native";
import { Background } from "../../../components/Background";
import { Header } from "../../../components/Header";
import { Title } from "../../../components/Texts/Title";
import ChatBox from "../../../components/Chat/ChatBox";
import Chat from "../../../components/Chat/Chat";
import ButtonColor from "../../../components/Chat/ButtonColor";
import Button from "../../../components/Chat/Button";
import * as ImagePicker from 'expo-image-picker';

import * as Store from 'expo-secure-store'
import { useEffect, useState } from "react";
import Layout from "../../../constants/Layout";

export default function PictureValidation({ navigation }: TerrainTabScreenProps<'PictureValidation'>) {

  const [picture, setPicture] = useState();
  const [count, setCount] = useState(1);

  useEffect(() => {
    async function loadData() {
      let area = await Store.getItemAsync('new_area');
      if (!area) return;
      setPicture(JSON.parse(area).photo.uri)
    }
    loadData()
  });

  const cancel = () => {
    navigation.goBack()
  }

  const takePicture = async () => {

    let area = await Store.getItemAsync('new_area');
    if (!area) return;
    
    const json = JSON.parse(area)

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    json.photo = result;
    
    await Store.setItemAsync('new_area', JSON.stringify(json))
    setPicture(json.photo.uri)

  }

  if (!picture) return null
  else return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title title='Ajouter un terrain' style={{ marginTop: 25 }} big={true}></Title>
      <Image source={{ uri: picture }} style={styles.picture} />
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Est-ce que cette photo est cool ?</Chat>
        <View style={styles.buttonContainer}>
          <ButtonColor text="Pas fou..." subText="(Refaire)" color="#FE5E79" onPress={takePicture} />
          <ButtonColor text="Oui !" subText="(Valider)" color="#6EE37E" onPress={() => {}}/>
        </View>
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
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});