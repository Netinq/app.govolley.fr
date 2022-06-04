import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Chat extends Component {

  render() {

    return (
      <View style={this.styles.chat}>
        <Text style={this.styles.text}>{this.props.children}</Text>
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
    text: {
      fontFamily: 'franklin-gothic-medium',
      fontSize: 18,
      color: '#353535'
    }
  })

}