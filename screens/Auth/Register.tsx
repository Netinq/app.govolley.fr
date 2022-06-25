import { Component, useContext, useState } from "react";
import { Image, Linking, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Background } from "../../components/Background";
import Button from "../../components/Chat/Button";
import ChatBox from "../../components/Chat/ChatBox";
import ChatInput from "../../components/Chat/ChatInput";
import { Subtitle } from "../../components/Texts/Subtitle";
import { Title } from "../../components/Texts/Title";
import { AuthTabScreenProps } from "../../types";

import CheckBox from 'expo-checkbox'
import * as Store from 'expo-secure-store'

import { AuthContext } from "../../components/Context";
import ButtonText from "../../components/Chat/ButtonText";

export default function Register({ navigation }: AuthTabScreenProps<'Register'>) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setChecked] = useState(false);
  const [activity, setActivity] = useState(false)

  const { register } = useContext(AuthContext);

  const submit = async () => {

    setActivity(true)
    
    const profil = await Store.getItemAsync('profil')
    if (!profil) return
    let json = JSON.parse(profil)
    json.email = email
    json.password = password
    json.age = json.born
    delete json.born
    json = JSON.stringify(json)

    register(json)
  }

  const toLogin = () => {
    navigation.navigate("Auth", {screen: 'Login'})
  }

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../../assets/images/favicon.png')} />
      </View>
      <Title style={{ marginTop: 25 }} big={true}>Créer un compte</Title>
      <Subtitle>Pour accéder à certains de nos services, vous devez créer un compte utilisateur.</Subtitle>
      <ChatBox style={{marginTop: 25}}>
        <ChatInput placeholder="Mon email..." inputValue={email} setInputValue={setEmail}></ChatInput>
        <ChatInput placeholder="Mon mot de passe..." inputValue={password} setInputValue={setPassword} secureTextEntry={true}></ChatInput>
        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <CheckBox
            value={isChecked}
            onValueChange={setChecked}
            />
            <Text style={styles.rgpd}>J'accepte la <Text style={[styles.rgpd, styles.rgpd__link]} onPress={() => Linking.openURL('https://sarquentin.fr/govolley')}>politique de confidentialité</Text></Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 15 }}>
        <ButtonText text="J'ai déjà un compte ?" onPress={toLogin} />
        <Button text="Créer" disable={(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || password.length <= 6 || !isChecked)} onPress={submit} activity={activity} />
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
  },
  rgpd: {
    color: '#353535',
    fontFamily: 'franklin-gothic-medium',
    fontSize: 15,
    marginLeft: 5
  },
  rgpd__link: {
    color: '#FCB040',
    fontFamily: 'franklin-gothic-medium',
    fontSize: 15,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: '#FCB040'
  }
});