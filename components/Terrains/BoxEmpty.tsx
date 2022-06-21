import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, GestureResponderEvent, Image, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import { RootStackParamList, RootStackScreenProps, RootTabParamList } from "../../types";
import Button from "../Chat/Button";
import { View } from "../Themed";

export function BoxEmpty(props: {
  onPress: (event: GestureResponderEvent) => void,
}) {

  return (
    <View style={styles.content}>
    <View style={styles.contentImage}>
    </View>
      <View style={styles.bar}>
        <Text style={styles.text}>Aucun terrain</Text>
        <View style={styles.see}>
          <FontAwesome5 size={20} name='plus' color='#fff' />
          <Text style={styles.seeText}>Ajouter</Text>
        </View>
      </View>
    </View>
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 175,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: '#E9E9E9'
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
    fontSize: 12,
    padding: 10,
    width: 75,
    backgroundColor: '#FCB040',
    margin: 5,
    borderRadius: 25,
  },
  bar: {
    width: 200,
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center'
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
  infoBar: {
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
    paddingRight: 50,
    backgroundColor: 'transparent'
  },
  text: {
    fontFamily: 'franklin-gothic',
    fontSize: 15,
    marginLeft: 25
  },
  seeText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    color: '#fff',
    marginTop: 0,
    textTransform: "uppercase"
  },
})