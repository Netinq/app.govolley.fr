import { Component } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";

type Props = {
  style?: ViewStyle;
};

export default class ChatBox extends Component<Props> {

  render() {

    return (
      <View style={[this.styles.container, this.props.style]}>
        {this.props.children}
      </View>
    )

  }

  styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: Layout.window.width,
      paddingHorizontal: 35,
    },
  })

}