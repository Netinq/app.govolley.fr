import { FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Component } from "react";
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, ViewStyle } from "react-native";
import { QuizzTabParamList, RootStackParamList } from "../../types";

type Props = {
  text: string,
  onPress: (event: GestureResponderEvent) => void,
  disable?: boolean,
  style?: ViewStyle
}

export default class ButtonText extends Component<Props> {

  render() {

    return (
      <TouchableOpacity
        onPress={this.props.disable ? () => { } : this.props.onPress}
        style={this.props.style}
      >
      <Text style={this.styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )

  }

  styles = StyleSheet.create({
    text: {
      color: '#FCB040',
      fontFamily: 'franklin-gothic-medium',
      fontSize: 18
    }
  })

}