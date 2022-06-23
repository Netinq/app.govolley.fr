import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Background } from '../components/Background';
import Chat from '../components/Chat/Chat';
import ChatBox from '../components/Chat/ChatBox';

import EditScreenInfo from '../components/EditScreenInfo';
import { Header } from '../components/Header';
import { BigBox } from '../components/Terrains/BigBox';
import { Box } from '../components/Terrains/Box';
import { Title } from '../components/Texts/Title';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Terrain({ navigation }: RootTabScreenProps<'Home'>) {

  return (
    <View style={styles.container}>
      <Background />
      <ChatBox>
        <Chat icon={true}>La liste des tournois sera bientôt disponible !</Chat>
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
});
