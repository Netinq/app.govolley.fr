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
import { AuthTabParamList, QuizzTabParamList, RootStackParamList, RootTabParamList, RootTabScreenProps, TerrainTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View } from '../components/Themed';
import Soon from '../screens/Soon';
import Step1 from '../screens/Quizz/Step1';
import Step2 from '../screens/Quizz/Step2';
import Step3 from '../screens/Quizz/Step3';
import Step4 from '../screens/Quizz/Step4';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Add from '../screens/Terrain/Add';
import Picture from '../screens/Terrain/AddQuizz/Picture';
import PictureValidation from '../screens/Terrain/AddQuizz/PictureValidation';

import * as Store from 'expo-secure-store'
import { AuthContext } from '../components/Context';
import Number from '../screens/Terrain/AddQuizz/Number';
import Surface from '../screens/Terrain/AddQuizz/Surface';
import Final from '../screens/Terrain/AddQuizz/Final';
import Home from '../screens/Home';
import TerrainPage from '../screens/Terrain/TerrainPage';

export default function Navigation() {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const TerrainStack = createNativeStackNavigator<TerrainTabParamList>();
  const AddStack = createNativeStackNavigator<TerrainTabParamList>();
  const BottomTab = createBottomTabNavigator<RootTabParamList>();

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isRegistered, setRegistered] = React.useState(false);
  const [token, setToken] = React.useState("");

  const authContext = React.useMemo(
    () => ({
      register: (data: string) => {

        let headers = new Headers();
        headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
        headers.append("Content-Type", "application/json");

        const options = {
          method: 'POST',
          headers: headers,
          body: data
        }
    
        fetch("https://dev.govolley.fr/auth/register", options)
          .then(response => response.json())
          .then((result) => {
            Store.setItemAsync('jwt', JSON.stringify(result.token)).then(() => {
              setToken(result.token)
            })
          })
          .catch(error => console.log('error', error))
        
        return;
      },
      login: (data: string) => {
        
        let headers = new Headers();
        headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
        headers.append("Content-Type", "application/json");

        const options = {
          method: 'POST',
          headers: headers,
          body: data
        }
    
        fetch("https://dev.govolley.fr/auth/login", options)
          .then(response => response.json())
          .then((result) => {
            Store.setItemAsync('jwt', JSON.stringify(result.token)).then(() => {
              setToken(result.token)
            })
          })
          .catch(error => console.log('error', error))
        
        return;
      },
      logout: () => {
        Store.deleteItemAsync('jwt').then(() => {
          setToken("")
          return;
        })
      },
    }),
    []
  );

  React.useEffect(() => {
    async function isRegister() {
      try {
        await SecureStore.getItemAsync('jwt').then((data) => data && setToken(data))
        if (await SecureStore.getItemAsync('isRegistered')) setRegistered(true);
      } finally {
        setLoadingComplete(true)
      }
    }
    isRegister()
  }, []);

  const TerrainNavigator = () => {

    return (
      <TerrainStack.Navigator>
        <TerrainStack.Screen name="TerrainPage" component={TerrainPage} options={{ headerShown: false }} />
        <TerrainStack.Screen name='Add' component={AddNavigator} options={{ headerShown: false }} />
        <TerrainStack.Screen name='Auth' component={AuthNavigator}  options={{ headerShown: false }} />
      </TerrainStack.Navigator>
    )
  }
  
  const AddNavigator = () => {
  
    return (
      <AddStack.Navigator>
        {(token) ?
          <>
            <AddStack.Screen name='Add' component={Add} options={{ headerShown: false }} />
            <AddStack.Screen name='Picture' component={Picture} options={{ headerShown: false }} />
            <AddStack.Screen name='PictureValidation' component={PictureValidation} options={{ headerShown: false }} />
            <AddStack.Screen name='Number' component={Number} options={{ headerShown: false }} />
            <AddStack.Screen name='Surface' component={Surface} options={{ headerShown: false }} />
            <AddStack.Screen name='Final' component={Final} options={{ headerShown: false }} />
          </>
        : (<AddStack.Screen name='Auth' component={AuthNavigator} options={{headerShown: false}} />)}
      </AddStack.Navigator>
    )
  
  }

  const BottomTabNavigator = () => {
  
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
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarActiveTintColor: '#FCB040',
          tabBarInactiveTintColor: '#C9C9C9',
        }}
        >
        <BottomTab.Screen
          name='Home'
          component={Home}
          options={({ navigation }: RootTabScreenProps<'Home'>) => ({
            headerShown: false, 
            tabBarShowLabel: false,
            tabBarIcon: ({color}) => <TabBarIcon title="Home" name="volleyball-ball" color={color}/>,
          })}
        />
        <BottomTab.Screen
          name="Ajouter"
          component={AddNavigator}
          options={{
            headerShown: false, 
            tabBarShowLabel: false,
            tabBarStyle: {
              display: 'none'
            },
            tabBarIcon: () => <TabBarIcon center={true} title="Ajouter" name="plus" color="#ffffff" />,
          }}
        />
        <BottomTab.Screen
          name="Tournois"
          component={Soon}
          options={{
            headerShown: false, 
            tabBarShowLabel: false,
            title: 'Tournois', 
            tabBarIcon: ({color}) => <TabBarIcon title="Tournois" name="trophy" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    );
  }

  if (!isLoadingComplete) return null
  else return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {(!isRegistered && (<Stack.Screen name="Quizz" component={QuizzNavigator} options={{ headerShown: false }} />))}
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        {!token && <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />}
        <Stack.Screen name="Terrains" component={TerrainNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

const QuizzStack = createNativeStackNavigator<QuizzTabParamList>();

function QuizzNavigator() {

  return (
    <QuizzStack.Navigator>
      <QuizzStack.Screen name='Step1' component={Step1} options={{headerShown: false}} />
      <QuizzStack.Screen name='Step2' component={Step2} options={{headerShown: false}} />
      <QuizzStack.Screen name='Step3' component={Step3} options={{headerShown: false}} />
      <QuizzStack.Screen name='Step4' component={Step4} options={{headerShown: false}} />
    </QuizzStack.Navigator>
  )

}

const AuthStack = createNativeStackNavigator<AuthTabParamList>();

function AuthNavigator() {

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='Register' component={Register} options={{headerShown: false}} />
      <AuthStack.Screen name='Login' component={Login} options={{headerShown: false}} />
    </AuthStack.Navigator>
  )
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
      <Text style={[props['center'] ? TabBarIconStyle.barCenterText : TabBarIconStyle.barText, {color: props.color}]}>{props['title']}</Text>
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