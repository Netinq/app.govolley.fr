import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text } from "react-native";
import Layout from "../../constants/Layout";
import { View } from "../Themed";

export function BigBoxLoading() {

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
    width: Layout.window.width - 70,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 15
  },
  contentImage: {
    height: 175,
    width: Layout.window.width - 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: 'transparent'
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Layout.window.width - 70,
    height: 175,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
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
    color: '#fff',
    padding: 10,
    backgroundColor: '#D9D9D9',
    width: 75,
    margin: 5,
    borderRadius: 25,
  },
  bar: {
    width: Layout.window.width - 70,
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
  infoIcon: {
    height: 30,
    width: 30
  },
  infoText: {
    fontSize: 13,
    marginLeft: 5,
    borderRadius: 25,
    width: 50,
    backgroundColor: '#D9D9D9',
  },
})