/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Quizz: NavigatorScreenParams<QuizzTabParamList> | undefined;
  Modal: undefined;
  TerrainPage: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Terrains: undefined;
  Ajouter: undefined;
  Tournois: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type QuizzTabParamList = {
  Step1: undefined,
  Step2: undefined,
  Step3: undefined,
  Step4: undefined,
};

export type QuizzTabScreenProps<Screen extends keyof QuizzTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<QuizzTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;