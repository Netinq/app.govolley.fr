import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Background } from '../../components/Background';
import Button from '../../components/Chat/Button';
import Chat from '../../components/Chat/Chat';
import ChatBox from '../../components/Chat/ChatBox';
import { Title } from '../../components/Texts/Title';
import { QuizzTabScreenProps, QuizzTabParamList } from '../../types';

export default function Step2({ navigation }: QuizzTabScreenProps<'Step2'>) {

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title title='Pseudo' style={{marginTop: 25}} big={true}></Title>
      <ChatBox style={{marginTop: 25}}>
        <Chat>Commençons simplement, quel pseudo veux-tu utiliser ?</Chat>
        <Chat>Trouve en un cool et fun !</Chat>
        <Button text="C'est bon" navigation={navigation} goTo='Quizz' screen='Step2' />
      </ChatBox>
    </View>
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
