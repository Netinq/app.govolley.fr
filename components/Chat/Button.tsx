import { FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase } from "react-native";
import { QuizzTabParamList, RootStackParamList } from "../../types";

type Props = {
  text: string,
  navigation: CompositeNavigationProp<BottomTabNavigationProp<QuizzTabParamList>, NativeStackNavigationProp<RootStackParamList>>;
  goTo: keyof RootStackParamList,
  screen: keyof QuizzTabParamList,
}

export default class Button extends Component<Props> {

  navigate = () => {this.props.navigation.navigate(this.props.goTo, {screen: this.props.screen});}

  render() {

    return (
      <TouchableOpacity style={this.styles.button} onPress={this.navigate}>
        <Text style={this.styles.text}>{this.props.text}</Text>
        <FontAwesome5 style={{marginLeft: 15}} size={20} color={'#fff'} name={'arrow-right'} />
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
    text: {
      color: '#fff',
      fontFamily: 'franklin-gothic',
      fontSize: 20
    }
  })

}