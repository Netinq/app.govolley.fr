import { Component, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Background } from '../../components/Background';
import Button from '../../components/Chat/Button';
import Chat from '../../components/Chat/Chat';
import ChatBox from '../../components/Chat/ChatBox';
import { Title } from '../../components/Texts/Title';
import { QuizzTabScreenProps, QuizzTabParamList, RootStackParamList } from '../../types';
import * as SecureStore from 'expo-secure-store'
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: CompositeNavigationProp<BottomTabNavigationProp<QuizzTabParamList>, NativeStackNavigationProp<RootStackParamList>>
}

export default class Step1 extends Component<Props> {
  
  navigate = () => { this.props.navigation.navigate('Quizz', { screen: 'Step2' }); }

  render() {
    return (
      <View style={this.styles.container}>
        <Background />
        <View style={this.styles.top}>
          <Image style={this.styles.logo} source={require('../../assets/images/favicon.png')} />
        </View>
        <Title style={{ marginTop: 25 }} big={true}>Bienvenue</Title>
        <ChatBox style={{ marginTop: 25 }}>
          <Chat icon={true}>Salut ! J'aurai quelques questions rapides à te poser !</Chat>
          <Chat>Les informations seront stockées uniquement sur ton téléphone.</Chat>
          <Chat>Jusqu'à ce que tu décide de créer un compte.</Chat>
          <Button text='Allons-y' onPress={this.navigate} />
        </ChatBox>
      </View>
    );
  }
  styles = StyleSheet.create({
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
}

