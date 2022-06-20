import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import { RootStackParamList, RootStackScreenProps, RootTabParamList } from "../../types";
import { View } from "../Themed";

export function BoxLoading() {

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
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

  return (
    <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
      <View style={styles.contentImage}>
        <View style={styles.image} />
        <View style={styles.tagContent}>
            <Text style={styles.tag}></Text>
            <Text style={styles.tag}></Text>
        </View>
      </View>
      <View style={styles.bar}>
        <View style={styles.infoBar}>
          <View style={styles.info}>
            <Text style={styles.infoText}></Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}></Text>
          </View>
        </View>
        <View style={styles.see}>
        </View>
      </View>
    </Animated.View>
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
    backgroundColor: 'transparent'
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
    backgroundColor: '#D9D9D9',
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
    backgroundColor: '#D9D9D9',
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
  info: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: 'transparent'
  },
  infoText: {
    fontSize: 13,
    width: 50,
    marginLeft: 5,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
  }
})