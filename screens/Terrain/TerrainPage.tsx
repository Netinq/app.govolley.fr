import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { TerrainTabScreenProps } from '../../types';
import { Buffer } from 'buffer'
import Layout from '../../constants/Layout';
import { Title } from '../../components/Texts/Title';
import * as Location from 'expo-location';
import ButtonColor from '../../components/Chat/ButtonColor';
import Button from '../../components/Chat/Button';
import ButtonText from '../../components/Chat/ButtonText';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Subtitle } from '../../components/Texts/Subtitle';
import moment from 'moment';

type routeParams = {
  area_uuid: undefined;
}

export default function TerrainPage({ navigation, route }: TerrainTabScreenProps<'TerrainPage'>) {

  const [calculateDistance, setCalculateDistance] = useState("")
  const [adress, setAdress] = useState("")
  const [endTime, setEndTime] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [area, setArea] = useState({
    area_uuid: "",
    area_surface: 0,
    areas_nb: 0,
    adress: "",
    latitude: 0,
    longitude: 0,
    surface: {
      name: ""
    },
    image_data: {
      data: []
    },
    expired_at: null,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current

  function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344
      return dist.toFixed(1);
    }
  }
  
  const getLocation = async (area: {latitude:0 ,longitude:0}) => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setCalculateDistance(`Localisation (${distance(area.latitude, area.longitude, currentLocation?.coords.latitude, currentLocation?.coords.longitude)} km)`)
    setLoaded(true)
  }

  const getArea = async () => {

    let headers = new Headers();
    headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
    headers.append("Content-Type", "application/json");

    const options = {
      method: 'GET',
      headers: headers,
    }

    fetch(`https://dev.govolley.fr/area/${route.params.area_uuid}`, options)
      .then(response => response.json())
      .then((result) => {
        setArea(result)
        setAdress(result.adress)
        if (result.expired_at) setEndTime(`Disponible jusqu'à ${moment(result.expired_at).format("HH:mm")}`)
        getLocation(result)
      })
      .catch(error => console.log('error', error))
  }

  useEffect(() => {
    if (area.area_uuid.length <= 0) getArea()
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 750,
            easing: v => v,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 750,
            easing: v => v,
            useNativeDriver: true,
          }
        ),
      ])
    ).start()
  }, [fadeAnim])

  const goBack = () => {
    navigation.goBack()
  }

  const clipboard = async () => {
    Clipboard.setStringAsync(area.adress)
    setAdress('Copié !')
    setTimeout(() => {
      setAdress(area.adress)
    }, 600);
  }

  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${area.latitude},${area.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    if (url) Linking.openURL(url);
  }

  if (!loaded) return (
    <View style={styles.container}>
      <Animated.View style={[styles.image__loading, {opacity: fadeAnim}]}></Animated.View>
      <Header onlyBack={true} backPress={goBack} customBack='annuler' />
      <View style={styles.area}>
        <Background second />
        <Title noPadding>Caractéristiques</Title>
        <Animated.View style={[styles.tagContent, {opacity: fadeAnim}]}>
            <Text style={styles.tag__loading}></Text>
            <Text style={styles.tag__loading}></Text>
        </Animated.View>
        <Title noPadding style={{marginTop: 25}}>Localisation</Title>
        <View style={styles.adressContent}>
          <Animated.View style={[styles.adress__loading, {opacity: fadeAnim}]}></Animated.View>
          <Animated.View style={[styles.button__loading, {opacity: fadeAnim}]}></Animated.View>
        </View>
      </View>
    </View>
  );
  else return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode='cover' resizeMethod="scale" source={{ uri: 'data:image/png;base64,' + Buffer.from(area.image_data.data).toString('base64') }} />
      <Header onlyBack={true} backPress={goBack} customBack='annuler' />
      <View style={styles.area}>
        <Background second />
          {endTime && <Title noPadding>{endTime}</Title>}
        <Title noPadding style={endTime ? {marginTop: 25} : {}}>Caractéristiques</Title>
        <View style={styles.tagContent}>
          {[`${area.areas_nb} Terrain(s)`, area.surface.name].map((tag, i) => 
            <Text style={styles.tag} key={i}>{tag}</Text>
          )}
        </View>
        <Title noPadding style={{marginTop: 25}}>{calculateDistance}</Title>
        <View style={styles.adressContent}>
          <TouchableOpacity style={styles.adress} onPress={clipboard}>
            <Image style={styles.infoIcon} source={require('../../assets/images/icon.png')} />
            <Text style={styles.adressText}>{adress}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openMap}>
            <FontAwesome size={20} color={"#fff"} name="map-marker" />
            <Text style={styles.buttonText}>y aller</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: (Layout.window.width),
    height: ((Layout.window.width) * 0.75),
  },
  image__loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: (Layout.window.width),
    height: ((Layout.window.width) * 0.75),
    backgroundColor: '#E9E9E9'
  },
  area: {
    height: Layout.window.height - ((Layout.window.width) * 0.75) + 50,
    width: Layout.window.width,
    position: 'absolute',
    top: ((Layout.window.width) * 0.75) - 50,
    left: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 25
  },
  tagContent: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: 'transparent'
  },
  tag: {
    fontFamily: 'franklin-gothic-medium',
    fontSize: 18,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FCB040',
    marginRight: 15,
    borderRadius: 25,
  },
  tag__loading: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#D9D9D9',
    marginRight: 15,
    borderRadius: 25,
    width: 100
  },
  adressContent: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'transparent',
    width: '100%'
  },
  adress: {
    width: Layout.window.width - 50 - 65 - 25,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  adress__loading: {
    width: Layout.window.width - 50 - 65 - 25,
    height: 65,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
  },
  adressText: {
    width: '75%',
    fontFamily: 'franklin-gothic-medium',
    fontSize: 15,
  },
  buttonText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    textTransform: 'uppercase',
    color: "#fff",
    marginTop: 3,
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCB040',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 65,
    width: 65,
  },
  button__loading: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 65,
    width: 65,
  },
  infoIcon: {
    height: 50,
    width: 50
  },
});
