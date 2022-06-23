import { Component } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";

type Props = {
  subText?: string,
  color: string,
  onPress: (event: GestureResponderEvent) => void,
  style?: ViewStyle,
  disable?: boolean,
}

export default class ButtonColor extends Component<Props> {

  render() {

    return (
      <TouchableOpacity
        style={this.props.disable ? this.styles.button__disable : [this.styles.button, this.props.style]}
        onPress={this.props.disable ? () => { } : this.props.onPress}>
        <Text style={this.styles.text}>{this.props.children}</Text>
        {this.props.subText && <Text style={this.styles.subText}>{this.props.subText}</Text>}
      </TouchableOpacity>
    )

  }

  styles = StyleSheet.create({
    button: {
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: this.props.color,
      borderRadius: 15,
      borderTopRightRadius: 0,
      width: '45%',
      marginBottom: ((Layout.window.width - 70)*10/100)
    },
    text: {
      color: '#fff',
      fontFamily: 'franklin-gothic',
      fontSize: 20
    },
    subText: {
      color: '#fff',
      fontFamily: 'franklin-gothic',
      fontSize: 15
    },
    button__disable: {
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#E6E6E6',
      borderRadius: 15,
      borderTopRightRadius: 0,
      width: '45%',
    },
  })

}