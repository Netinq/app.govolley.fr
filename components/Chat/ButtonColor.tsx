import { FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Component } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";
import { QuizzTabParamList, RootStackParamList } from "../../types";

type Props = {
  text: string,
  subText?: string,
  color: string,
  onPress: (event: GestureResponderEvent) => void,
  style?: ViewStyle,
}

export default class ButtonColor extends Component<Props> {

  render() {

    return (
      <TouchableOpacity style={[this.styles.button, this.props.style]} onPress={this.props.onPress}>
        <Text style={this.styles.text}>{this.props.text}</Text>
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
    }
  })

}