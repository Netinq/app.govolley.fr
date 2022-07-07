import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import moment from 'moment';
import 'moment/locale/fr'

import * as SecureStore from 'expo-secure-store'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TerrainTabParamList, TerrainTabScreenProps } from '../../../types';
import { Background } from '../../../components/Background';
import { Title } from '../../../components/Texts/Title';
import ChatBox from '../../../components/Chat/ChatBox';
import Chat from '../../../components/Chat/Chat';
import ChatInput from '../../../components/Chat/ChatInput';
import Button from '../../../components/Chat/Button';
import Layout from '../../../constants/Layout';
import { Header } from '../../../components/Header';

import * as Store from 'expo-secure-store'

export default function Temp({ navigation }: TerrainTabScreenProps<'Temp'>) {

  const [inputValue, setInputValue] = useState("");
  const [endTime, setEndTime] = useState(new Date());

  const onPress = async () => {
    let profil = await SecureStore.getItemAsync('profil')
    if (!profil) return;

    const currentDate = moment(endTime);
    moment.locale('fr')

    let json = JSON.parse(profil)
    json.born = currentDate.format('YYYY-MM-DD HH:mm:ss');
    await SecureStore.setItemAsync('profil', JSON.stringify(json)).then(() => {
      navigation.navigate('Picture')
    })
  }

  const onChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    const currentDate = moment(date);
    moment.locale('fr')
    setInputValue(currentDate ? currentDate.format('HH:mm') : "");
    if (date) setEndTime(date)
  };

  const onPressInput = () => {
    DateTimePickerAndroid.open({
      value: endTime,
      onChange,
      mode: 'time',
    })
    return 0;
  }

  const next = async () => {

    let area = await Store.getItemAsync('new_area');
    if (!area) return;
    let json = JSON.parse(area)
    const currentDate = moment(endTime);
    moment.locale('fr')
    json.endTime = currentDate;


    await Store.setItemAsync('new_area', JSON.stringify(json))
    navigation.navigate('Picture')
  }

  const cancel = () => navigation.goBack()
  
  return (
    <View style={styles.container}>
      <Background />
      <Header onlyBack={true} backPress={cancel} customBack='annuler' />
      <Title style={{ marginTop: 25 }} big={true}>Ajouter un terrain</Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Jusqu'à quand le terrain sera-t-il monté ?</Chat>
        <ChatInput onPress={onPressInput} inputValue={inputValue} setInputValue={setInputValue} placeholder="17h30..."></ChatInput>
        <Button disable={!inputValue} text="C'est bon" onPress={next} />
      </ChatBox>
    </View>
  );
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