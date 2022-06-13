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

  const [inputValue, setInputValue] = useState("");
  const [bornAt, setBornAt] = useState(new Date());
  const [nickname, setNickname] = useState("")

  useEffect(() => {
    async function loadData() {
      await SecureStore.getItemAsync('profil').then((data) => {
        if (!data) setNickname("<NICKNAME>");
        else setNickname(JSON.parse(data).nickname)
      })
    }
    loadData()
  });

  const onPress = async () => {
    let profil = await SecureStore.getItemAsync('profil')
    if (!profil) return;

    const currentDate = moment(bornAt);
    moment.locale('fr')

    let json = JSON.parse(profil)
    json.born = currentDate.format('YYYY-MM-DD');
    await SecureStore.setItemAsync('profil', JSON.stringify(json)).then(() => {
      navigation.navigate('Quizz', {screen: 'Step4'})
    })
  }

  const onChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    const currentDate = moment(date);
    moment.locale('fr')
    setInputValue(currentDate ? currentDate.format('DD MMMM YYYY') : "");
    if (date) setBornAt(date)
  };

  const onPressInput = () => {
    DateTimePickerAndroid.open({
      value: bornAt,
      onChange,
      mode: 'date',
    })
    return 0;
  }
  
  if (!nickname) return null
  else return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title title='Âge' style={{marginTop: 25}} big={true}></Title>
      <ChatBox style={{marginTop: 25, marginBottom: (Layout.window.height/2)}}>
        <Chat icon={true}>Hum.. {nickname}, selon moi tu est beau et jeune !</Chat>
        <Chat>Pourrais-tu me donner ton vrai âge ?</Chat>
        <ChatInput onPress={onPressInput} inputValue={inputValue} setInputValue={setInputValue} placeholder="Mon âge..."></ChatInput>
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
