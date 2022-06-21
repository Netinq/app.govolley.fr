import { Component } from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  icon?: boolean
  reverse?: boolean,
  style?: ViewStyle,
  noText?: boolean
}

export default class Chat extends Component<Props> {

  render() {

    return (
      <View style={this.props.reverse ? this.styles.chatReverse : [this.styles.chat, this.props.style]}>
        {this.props.icon && <Image style={this.styles.robot} source={require('../../assets/images/favicon.png')} />}
        {
          (!this.props.noText) ?
        <Text style={this.styles.text}>{this.props.children}</Text>
        :
        this.props.children
        }
      </View>
    )

  }

  styles = StyleSheet.create({
    chat: {
      paddingHorizontal: 35,
      paddingVertical: 20,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderTopLeftRadius: 0,
      width: '100%',
      marginBottom: 25
    },
    chatReverse: {
      paddingHorizontal: 35,
      paddingVertical: 20,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderTopRightRadius: 0,
      width: '100%',
      marginBottom: 25
    },
    text: {
      fontFamily: 'franklin-gothic-medium',
      fontSize: 18,
      color: '#353535',
    },
    robot: {
      position: 'absolute',
      top: -15,
      left: -25,
      height: 50,
      width: 50,
      zIndex: 100
    }
  })

}