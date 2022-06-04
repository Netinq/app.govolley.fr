/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Terrains from '../screens/Terrains';
import TabTwoScreen from '../screens/TabTwoScreen';
import { QuizzTabParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View } from '../components/Themed';
import Page from '../screens/Terrain/Page';
import Step1 from '../screens/Quizz/Step1';
import Step2 from '../screens/Quizz/Step2';

export default function Navigation() {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator() {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isRegistered, setRegistered] = React.useState(false);

  React.useEffect(() => {
    async function isRegister() {
      try {
        if (await SecureStore.getItemAsync('isRegistered')) setRegistered(true);
      } finally {
        setLoadingComplete(true)
      }
    }
    isRegister()
  }, []);

  if (!isLoadingComplete) return null
  else return (
    <Stack.Navigator>
      {(!isRegistered && (<Stack.Screen name="Quizz" component={QuizzNavigator} options={{ headerShown: false }} />))}
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TerrainPage" component={Page} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
*/

const QuizzStack = createNativeStackNavigator<QuizzTabParamList>();

function QuizzNavigator() {

  return (
    <QuizzStack.Navigator>
      <QuizzStack.Screen name='Step1' component={Step1} options={{headerShown: false}} />
      <QuizzStack.Screen name='Step2' component={Step2} options={{headerShown: false}} />
    </QuizzStack.Navigator>
  )

}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: 'center',
          height: 75,
          position: 'absolute',
          bottom: 0,
          left: 0, 
          right: 0
        },
        tabBarButton: props => <TouchableOpacity {...props} />
      }}
      >
      <BottomTab.Screen
        name='Terrains'
        component={Terrains}
        options={({ navigation }: RootTabScreenProps<'Terrains'>) => ({
          headerShown: false, 
          tabBarShowLabel: false,
          tabBarIcon: () => <TabBarIcon title="Terrains" name="volleyball-ball" color="#C9C9C9" />,
        })}
      />
      <BottomTab.Screen
        name="Ajouter"
        component={TabTwoScreen}
        options={{
          headerShown: false, 
          tabBarShowLabel: false,
          tabBarIcon: () => <TabBarIcon center={true} title="Ajouter" name="plus" color="#ffffff" />,
        }}
      />
      <BottomTab.Screen
        name="Tournois"
        component={TabTwoScreen}
        options={{
          headerShown: false, 
          tabBarShowLabel: false,
          title: 'Tournois', 
          tabBarIcon: () => <TabBarIcon title="Tournois" name="trophy" color="#C9C9C9" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  title: string;
  center?: boolean;
}) {
  return (
    <View
      style={props['center'] ? TabBarIconStyle.barCenter : TabBarIconStyle.bar}>
      <FontAwesome5 size={30} style={{ marginTop: -3 }} {...props} />
      <Text style={props['center'] ? TabBarIconStyle.barCenterText : TabBarIconStyle.barText}>{props['title']}</Text>
    </View>
  );
}

const TabBarIconStyle = StyleSheet.create({
  bar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  barText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    textTransform: 'uppercase',
    color: "#C9C9C9",
    marginTop: 3
  },
  barCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCB040',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 65,
    width: 65
  },
  barCenterText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    textTransform: 'uppercase',
    color: "#FFFFFF",
    marginTop: 3
  },
})