import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Search } from "./Search";

export function Header() {

  return (
    <View style={styles.header}>
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../assets/images/favicon.png')} />
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
    backgroundColor: 'transparent'
  },
  top: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
  }
})