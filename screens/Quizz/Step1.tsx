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
  
  render() {
    return (
      <View style={this.styles.container}>
        <Background />
        <View style={this.styles.top}>
          <Image style={this.styles.logo} source={require('../../assets/images/favicon.png')} />
        </View>
        <Title title='Bienvenue' style={{ marginTop: 25 }} big={true}></Title>
        <ChatBox style={{ marginTop: 25 }}>
          <Chat>Salut ! J'aurai quelques questions rapides à te poser !</Chat>
          <Button text='Allons-y' navigation={this.props.navigation} goTo='Quizz' screen='Step2' />
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

