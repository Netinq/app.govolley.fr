import { StyleSheet, Text, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";
import { View } from "../Themed";

export function Title( props: {
  title: string;
  style?: ViewStyle;
}) {
  
  return (
    <View style={[styles.content, props['style']]}>
      <Text style={styles.text}>{props['title']}</Text>
      <View style={styles.separator}></View>
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
  separator: {
    height: 8,
    width: 50,
    backgroundColor: '#FCB040',
    borderRadius: 4
  }
})