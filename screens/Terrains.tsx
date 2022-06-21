import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Background } from '../components/Background';

import EditScreenInfo from '../components/EditScreenInfo';
import { Header } from '../components/Header';
import { BigBox } from '../components/Terrains/BigBox';
import { BigBoxLoading } from '../components/Terrains/BigBoxLoading';
import { Box } from '../components/Terrains/Box';
import { BoxLoading } from '../components/Terrains/BoxLoading';
import { Title } from '../components/Texts/Title';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import * as Location from 'expo-location'
import { BoxEmpty } from '../components/Terrains/BoxEmpty';

export default function Terrain({ navigation }: RootTabScreenProps<'Terrains'>) {

  const [errorLocation, setErrorLocation] = useState('')
  const [load, setLoad] = useState(true)
  const [areas, setAreas] = useState([])
  const [areasComponent, setAreasComponent] = useState<JSX.Element[]>([])
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [isScrolled, setScrolled] = useState(false);

  const getLocation = async () => {
    if (location) return;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorLocation('L\'accès à la localisation est requise');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    let headers = new Headers();
    headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
    headers.append("Content-Type", "application/json");


    const data = JSON.stringify({
      longitude: currentLocation?.coords.longitude,
      latitude: currentLocation?.coords.latitude,
      distance: 10,
    })

    const options = {
      method: 'POST',
      headers: headers,
      body: data
    }

    fetch("https://dev.govolley.fr/area/near", options)
      .then(response => response.json())
      .then((result) => {
        setAreas(result)
        let array = new Array();
        result.forEach((area: undefined, i: number) => {
          if (!area) return;
          array.push(<Box key={i} navigation={navigation} area={area} location={currentLocation} ></Box>)
        })
        setAreasComponent(array)
        setLoad(false)
      })
      .catch(error => console.log('error', error))
  }

  useEffect(() => {
    getLocation()
  })


  return (
    <View style={styles.container}>
      <Background />
      <Header />
      <ScrollView onScroll={({nativeEvent}) => nativeEvent.contentOffset.y >= 5 ? setScrolled(true) : setScrolled(false)}>
      <Title style={{marginTop: 25}}>Proche de vous</Title>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView} horizontal={true}>
          <View style={styles.spacer}></View>
          {
            !load ? 
              areas.length > 0 ?
                areasComponent
                :
                <BoxEmpty onPress={() => {navigation.navigate('Ajouter')}} />
              :
              <>
                <BoxLoading />
                <BoxLoading />
              </>
          }
          <View style={styles.spacer}></View>
        </ScrollView>
        <Title>Tous les terrains</Title>
        <View style={styles.allContainter}>
          {/* <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox> */}
          <BigBoxLoading />
        </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 200,
  },
  scrollView: {
    marginTop: 25,
    height: 250,
  },
  spacer: {
    height: 250,
    width: 30,
    backgroundColor: 'transparent'
  },
  allContainter: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 35,
    backgroundColor: 'transparent',
    paddingBottom: 100
  }
});
