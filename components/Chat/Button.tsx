import { FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Component } from "react";
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase } from "react-native";
import { QuizzTabParamList, RootStackParamList } from "../../types";

type Props = {
  text: string,
  onPress: (event: GestureResponderEvent) => void,
  disable?: boolean,
  activity?: boolean,
  icon?: string,
}

export default class Button extends Component<Props> {

  render() {

    return (
      <TouchableOpacity
        style={this.props.disable ? this.styles.button__disable : this.styles.button}
        onPress={this.props.disable || this.props.activity ? () => { } : this.props.onPress}
      >
        {!this.props.activity ?
          (<>
          <Text style={this.styles.text}>{this.props.text}</Text>
          <FontAwesome5 style={{marginLeft: 15}} size={20} color={'#fff'} name={this.props.icon ? this.props.icon : 'arrow-right'} />
          </>)
          : (
            <ActivityIndicator size={30} color="#fff" />
          )}
      </TouchableOpacity>
    )

  }

  styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#FCB040',
      borderRadius: 15,
      borderTopRightRadius: 0,
      alignSelf: 'flex-end'
    },
    button__disable: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#E6E6E6',
      borderRadius: 15,
      borderTopRightRadius: 0,
      alignSelf: 'flex-end'
    },
    text: {
      color: '#fff',
      fontFamily: 'franklin-gothic',
      fontSize: 20
    }
  })

}