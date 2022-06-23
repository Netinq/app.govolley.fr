import { TerrainTabScreenProps } from "../../../types";
import { StyleSheet, View } from "react-native";
import { Background } from "../../../components/Background";
import { Header } from "../../../components/Header";
import { Title } from "../../../components/Texts/Title";
import ChatBox from "../../../components/Chat/ChatBox";
import Chat from "../../../components/Chat/Chat";
import ButtonColor from "../../../components/Chat/ButtonColor";

import * as Store from 'expo-secure-store'
import { useEffect, useState } from "react";
import Layout from "../../../constants/Layout";
import ButtonBox from "../../../components/Chat/ButtonBox";

export default function Surface({ navigation }: TerrainTabScreenProps<'Surface'>) {

  const surfaces = [
    {id: 1, name: 'Beach', color: '#FACC4D'},
    {id: 2, name: 'Herbe', color: '#6EE37E'},
    {id: 3, name: 'Beton', color: '#767676'},
    {id: 4, name: 'Interieur', color: '#FF845F'},
  ]

  const [area, setArea] = useState("")
  const surfacesComponents = new Array();

  useEffect(() => {
    async function loadData() {
      let area = await Store.getItemAsync('new_area');
      if (!area) return;
      surfaces.forEach((surface, i) => {
        surfacesComponents.push(<ButtonColor key={i} color={surface.color} onPress={() => next(surface.id)}>{surface.name}</ButtonColor>)
      })
      setArea(area);
    }
    loadData()
  });

  const cancel = () => {
    navigation.goBack()
  }

  const next = async (surface_id: number) => {

    if (!area) return;
    let json = JSON.parse(area)
    json.area_surface = surface_id;

    await Store.setItemAsync('new_area', JSON.stringify(json))
    navigation.navigate('Final')
  }

  return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title style={{ marginTop: 25 }} big={true}>Ajouter un terrain</Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>De quel type de surface s'agit-il ?</Chat>
        <ButtonBox>
          {
            surfaces.map((surface, i) => 
              <ButtonColor key={i} color={surface.color} onPress={() => next(surface.id)}>{surface.name}</ButtonColor>
            )
          }
        </ButtonBox>
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
});