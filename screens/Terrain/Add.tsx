import { Component, useState } from "react";
import * as Store from 'expo-secure-store'
import { QuizzTabParamList, RootStackParamList, TerrainTabScreenProps } from "../../types";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "../../components/Texts/Title";

export default function Add({ navigation }: TerrainTabScreenProps<'Add'>) {

  return (
    <View>
      <Title title="Ajouter terrain" />
    </View>
  )

}