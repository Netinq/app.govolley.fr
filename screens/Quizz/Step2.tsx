import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Background } from '../../components/Background';
import Button from '../../components/Chat/Button';
import Chat from '../../components/Chat/Chat';
import ChatBox from '../../components/Chat/ChatBox';
import ChatInput from '../../components/Chat/ChatInput';
import { Title } from '../../components/Texts/Title';
import { QuizzTabScreenProps, QuizzTabParamList } from '../../types';

import * as SecureStore from 'expo-secure-store'
import Layout from '../../constants/Layout';

export default function Step2({ navigation }: QuizzTabScreenProps<'Step2'>) {

  const [inputValue, setInputValue] = useState("");

  const onPress = async () => {
    const profil = {
      nickname: inputValue
    }
    await SecureStore.setItemAsync('profil', JSON.stringify(profil)).then(() => {
      navigation.navigate('Quizz', {screen: 'Step3'})
    });
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title title='Pseudo' style={{marginTop: 25}} big={true}></Title>
      <ChatBox style={{marginTop: 25, marginBottom: (Layout.window.height*0.5)}}>
        <Chat icon={true}>Commençons simplement, quel pseudo veux-tu utiliser ?</Chat>
        <Chat>Trouve en un cool et fun !</Chat>
        <ChatInput placeholder="Mon pseudo..." inputValue={inputValue} setInputValue={setInputValue} style={{marginTop: 25}} />
        <Button text="C'est bon" onPress={onPress} disable={inputValue.length <= 0 ? true : false} />
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
