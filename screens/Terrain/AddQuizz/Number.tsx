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
import NumberInput from "../../../components/Chat/NumberInput";

export default function Number({ navigation }: TerrainTabScreenProps<'Number'>) {

  const [count, setCount] = useState(1);
  const [area, setArea] = useState("")

  useEffect(() => {
    async function loadData() {
      let area = await Store.getItemAsync('new_area');
      if (!area) return;
      setArea(area);
    }
    loadData()
  });

  const cancel = () => {
    navigation.goBack()
  }

  const next = async () => {

    if (!area) return;
    let json = JSON.parse(area)
    json.areas_nb = count;

    await Store.setItemAsync('new_area', JSON.stringify(json))
    navigation.navigate('Surface')
  }

  return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title style={{ marginTop: 25 }} big={true}>Ajouter un terrain</Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Combien de terrain y a-t-il ?</Chat>
        <Chat noText={true} reverse={true} style={{justifyContent: 'center', flexDirection: 'row'}}>
          <NumberInput count={count} setCount={setCount} />
        </Chat>
        <Button style={{marginTop: 25}} text="Suivant" onPress={next}/>
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