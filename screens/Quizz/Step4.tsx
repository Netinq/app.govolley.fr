import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Background } from '../../components/Background';
import Button from '../../components/Chat/Button';
import Chat from '../../components/Chat/Chat';
import ChatBox from '../../components/Chat/ChatBox';
import ChatInput from '../../components/Chat/ChatInput';
import { Title } from '../../components/Texts/Title';
import { QuizzTabScreenProps } from '../../types';

import moment from 'moment';
import 'moment/locale/fr'

import * as SecureStore from 'expo-secure-store'
import Layout from '../../constants/Layout';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function Step3({ navigation }: QuizzTabScreenProps<'Step3'>) {

  const [inputValue, setInputValue] = useState(0);

  const onPress = async () => {
    let profil = await SecureStore.getItemAsync('profil')
    if (!profil) return;

    let json = JSON.parse(profil)
    json.level = inputValue;
    await SecureStore.setItemAsync('profil', JSON.stringify(json)).then(() => {
      console.log("SUIVANT")
    })
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title title='Âge' style={{marginTop: 25}} big={true}></Title>
      <ChatBox style={{marginTop: 25, marginBottom: (Layout.window.height/2)}}>
        <Chat icon={true}>Dans ma jeunesse je jouais à haut niveau..</Chat>
        <Chat>Comment estimerais-tu ton niveau ?</Chat>
        <Button text="C'est bon" onPress={onPress} />
      </ChatBox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  top: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    height: 150,
    width: 150
  }
});
