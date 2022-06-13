import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import Layout from "../constants/Layout";
import { Search } from "./Search";

export function Header() {

  return (
    <View style={styles.header}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.backContainer}>
        </TouchableOpacity> 
        <Image style={styles.logo} source={require('../assets/images/favicon.png')} />
        <TouchableOpacity style={styles.container}>
          <FontAwesome size={20} color={"#fff"} name="user" />
          <Text style={styles.barText}>profil</Text>
        </TouchableOpacity> 
      </View>
      <View style={styles.bottom}>
        <Search />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 50,
    flex: 1,
    paddingHorizontal: 35,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: Layout.window.width
  },
  top: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%'
  },
  bottom: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    height: 75,
    width: 75
  },
  barText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    textTransform: 'uppercase',
    color: "#fff",
    marginTop: 3,
    textAlign: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCB040',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 65,
    width: 65,
  },
  backContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 65,
    width: 65,
  }
})