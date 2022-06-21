import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import { RootStackParamList, RootStackScreenProps, RootTabParamList } from "../../types";
import { View } from "../Themed";

import { Buffer } from 'buffer'
import { LocationObject } from "expo-location";

export function Box(props: {
  area: {
    latitude: number,
    longitude: number,
    image_data: {
      data: BinaryType
    },
    areas_nb: number,
    surface: string
  },
  location: LocationObject,
  navigation: CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, "Terrains", undefined>, NativeStackNavigationProp<RootStackParamList>>;
}) {
  
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

  const calculateDistance = `${distance(props.area.latitude, props.area.longitude, props.location.coords.latitude, props.location.coords.longitude)} km`;
  const navigate = () => props.navigation.navigate('TerrainPage');

  return (
    <TouchableOpacity style={styles.content} onPress={navigate}>
      <View style={styles.contentImage}>
        <Image style={styles.image} resizeMode='cover' resizeMethod="scale" source={{ uri: 'data:image/png;base64,' + Buffer.from(props.area.image_data.data).toString('base64') }} />
        <View style={styles.tagContent}>
          {[`${props.area.areas_nb} Terrain(s)`, props.area.surface].map((tag, i) => 
            <Text style={styles.tag} key={i}>{tag}</Text>
          )}
        </View>
      </View>
      <View style={styles.bar}>
        <View style={styles.infoBar}>
          <View style={styles.info}>
            <Image style={styles.infoIcon} source={require('../../assets/images/icon.png')} />
            <Text style={styles.infoText}>{calculateDistance}</Text>
          </View>
          <View style={styles.info}>
            <FontAwesome size={20} name='star' color='#ECA338' />
            <Text style={styles.infoText}>10</Text>
          </View>
        </View>
        <View style={styles.see}>
          <FontAwesome5 size={20} name='eye' color='#fff' />
          <Text style={styles.seeText}>Voir</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  content: {
    height: 225,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  contentImage: {
    height: 175,
    width: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 175,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    resizeMode: 'cover',
  },
  tagContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: 'transparent'
  },
  tag: {
    fontFamily: 'franklin-gothic-medium',
    fontSize: 12,
    color: '#fff',
    padding: 10,
    backgroundColor: '#FCB040',
    margin: 5,
    borderRadius: 25,
  },
  bar: {
    width: 200,
    height: 50,
    backgroundColor: 'transparent'
  },
  see: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#FCB040',
    position: 'absolute',
    right: 0,
    top: 0,
    height: 50,
    width: 50
  },
  seeText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    color: '#fff',
    marginTop: 0,
    textTransform: "uppercase"
  },
  infoBar: {
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
    paddingRight: 50,
    backgroundColor: 'transparent'
  },
  info: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: 'transparent'
  },
  infoIcon: {
    height: 30,
    width: 30
  },
  infoText: {
    fontFamily: 'calibri-bold',
    fontSize: 13,
    color: '#353535',
    marginLeft: 5
  }
})