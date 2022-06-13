import { Component, useState } from "react";
import * as Store from 'expo-secure-store'
import { QuizzTabParamList, RootStackParamList, TerrainTabScreenProps } from "../../types";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Title } from "../../components/Texts/Title";
import { Background } from "../../components/Background";
import ChatBox from "../../components/Chat/ChatBox";
import Chat from "../../components/Chat/Chat";
import ButtonColor from "../../components/Chat/ButtonColor";

export default function Add({ navigation }: TerrainTabScreenProps<'Add'>) {

  return (
    <View style={styles.container}>
      <Background />
      <Title title='Ajouter un terrain' style={{ marginTop: 25 }} big={true}></Title>
      <ChatBox style={{ marginTop: 25 }}>
        <Chat icon={true}>Tiens ! Je te revois enfin ? Pour ajouter un terrain c'est très simple.</Chat>
        <Chat>Veux-tu répertorier un terrain publique ou veux-tu signaler la présence de ton terrain ?</Chat>
        <View style={styles.buttonContainer}>
          <ButtonColor text="Mon terrain" subText="(Ephémère)" color="#74C6F6" onPress={() => {}}/>
          <ButtonColor text="Terrain publique" color="#F674C2" onPress={() => {}}/>
        </View>
      </ChatBox>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});