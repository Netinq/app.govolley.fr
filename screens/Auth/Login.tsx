import { Component, useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Background } from "../../components/Background";
import Button from "../../components/Chat/Button";
import ChatBox from "../../components/Chat/ChatBox";
import ChatInput from "../../components/Chat/ChatInput";
import { Subtitle } from "../../components/Texts/Subtitle";
import { Title } from "../../components/Texts/Title";
import { AuthTabScreenProps } from "../../types";

import * as Store from 'expo-secure-store'
import { AuthContext } from "../../components/Context";
import ButtonText from "../../components/Chat/ButtonText";

export default function Login({ navigation }: AuthTabScreenProps<'Login'>) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activity, setActivity] = useState(false)

  const { login } = useContext(AuthContext);

  const submit = () => {

    setActivity(true)
    
    let json = JSON.stringify({
      email: email,
      password: password
    })

    login(json)
  }

  const toRegister = () => {
    navigation.navigate("Auth", {screen: 'Register'})
  }

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title style={{ marginTop: 25 }} big={true}>Mon compte</Title>
      <ChatBox style={{marginTop: 25}}>
        <ChatInput placeholder="Mon email..." inputValue={email} setInputValue={setEmail}></ChatInput>
        <ChatInput placeholder="Mon mot de passe..." inputValue={password} setInputValue={setPassword} secureTextEntry={true}></ChatInput>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
        <ButtonText text="Pas de compte ?" onPress={toRegister} />
        <Button text="Accéder" disable={(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || password.length <= 6)} onPress={submit} activity={activity} />
        </View>
      </ChatBox>
    </View>
  )

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