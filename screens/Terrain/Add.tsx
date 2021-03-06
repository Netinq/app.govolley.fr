import { QuizzTabParamList, RootStackParamList, TerrainTabScreenProps } from "../../types";
import { StyleSheet, View } from "react-native";
import { Title } from "../../components/Texts/Title";
import { Background } from "../../components/Background";
import ChatBox from "../../components/Chat/ChatBox";
import Chat from "../../components/Chat/Chat";
import ButtonColor from "../../components/Chat/ButtonColor";
import { Header } from "../../components/Header";

import * as Store from 'expo-secure-store'
import ButtonBox from "../../components/Chat/ButtonBox";

export default function Add({ navigation }: TerrainTabScreenProps<'Add'>) {

  const cancel = () => {
    navigation.goBack()
  }

  const pressPublic = async () => {

    const area = {
      type: 'public'
    }

    await Store.setItemAsync('new_area', JSON.stringify(area))
    next()
  }

  const next = () => {
    navigation.navigate("Picture");
  }

  return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title style={{ marginTop: 25 }} big={true}>Ajouter un terrain</Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Tiens ! Je te revois enfin ? Pour ajouter un terrain c'est très simple.</Chat>
        <Chat>Veux-tu répertorier un terrain publique ou veux-tu signaler la présence de ton terrain ?</Chat>
        <ButtonBox>
          <ButtonColor text="Mon terrain" subText="(Ephémère)" color="#74C6F6" onPress={() => {}} disable={true} />
          <ButtonColor text="Terrain publique" color="#F674C2" onPress={pressPublic}/>
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
});