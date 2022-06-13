import { ReactChildren } from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";
import { View } from "../Themed";

export function Subtitle(props: {
  children?: string,
  style?: ViewStyle,
  big?: boolean,
}) {
  
  return (
    <View style={[styles.content, props.style]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 35,
    marginTop: 10,
    width: Layout.window.width,
    backgroundColor: 'transparent'
  },
  text: {
    fontFamily: 'calibri',
    fontSize: 17,
    color: '#353535'
  },
})