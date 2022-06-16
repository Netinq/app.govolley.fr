import { QuizzTabParamList, RootStackParamList, TerrainTabScreenProps } from "../../../types";
import { StyleSheet, View } from "react-native";
import { Background } from "../../../components/Background";
import { Header } from "../../../components/Header";
import { Title } from "../../../components/Texts/Title";
import ChatBox from "../../../components/Chat/ChatBox";
import Chat from "../../../components/Chat/Chat";
import ButtonColor from "../../../components/Chat/ButtonColor";
import Button from "../../../components/Chat/Button";
import * as ImagePicker from 'expo-image-picker';

import * as Store from 'expo-secure-store'

export default function Picture({ navigation }: TerrainTabScreenProps<'Picture'>) {

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
    
    Store.setItemAsync('new_area', JSON.stringify(json)).then(() => navigation.navigate('PictureValidation'))

  }

  return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title style={{ marginTop: 25 }} big={true}>Ajouter un terrain</Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Pour commencer, je t'invite à prendre une photo du terrain !</Chat>
        <Button text="Photographier" icon="camera" onPress={takePicture} />
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