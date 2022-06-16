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
import ButtonColor from '../../components/Chat/ButtonColor';
import ButtonBox from '../../components/Chat/ButtonBox';

export default function Step3({ navigation }: QuizzTabScreenProps<'Step3'>) {

  const onPress = async (level: number) => {
    let profil = await SecureStore.getItemAsync('profil')
    if (!profil) return;

    let json = JSON.parse(profil)
    json.level = level;
    SecureStore.setItemAsync('profil', JSON.stringify(json)).then(async () => {
      SecureStore.setItemAsync('isRegistered', 'true').then(() => {
        navigation.navigate('Root')
      })
    })
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title style={{marginTop: 25}} big={true}>Niveau</Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Dans ma jeunesse je jouais à haut niveau..</Chat>
        <Chat>Comment estimerais-tu ton niveau ?</Chat>
        <ButtonBox>
          <ButtonColor text='Fort' subText='(Amateur)' color='#74C6F6' onPress={async () => onPress(1)} />
          <ButtonColor text='Très fort' subText='(Confirmé)' color='#7074FF' onPress={async () => onPress(1)} />
          <ButtonColor text='Super fort' subText='(Compétiteur)' color='#FE5E79' onPress={async () => onPress(1)} />
        </ButtonBox>
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
  },
});
