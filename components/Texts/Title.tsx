import { ReactChildren } from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";
import { View } from "../Themed";

export function Title( props: {
  style?: ViewStyle;
  big?: boolean,
  children: string
}) {
  
  return (
    <View style={[styles.content, props.style]}>
      <Text style={props.big ? styles.textBig : styles.text}>{props.children}</Text>
      <View style={props.big ? styles.separatorBig : styles.separator}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 35,
    width: Layout.window.width,
    backgroundColor: 'transparent'
  },
  text: {
    fontFamily: 'calibri-bold',
    fontSize: 25,
    color: '#353535'
  },
  textBig: {
    fontFamily: 'calibri-bold',
    fontSize: 35,
    color: '#353535'
  },
  separator: {
    height: 8,
    width: 50,
    backgroundColor: '#FCB040',
    borderRadius: 4
  },
  separatorBig: {
    height: 8,
    width: 75,
    backgroundColor: '#FCB040',
    borderRadius: 4
  }
})