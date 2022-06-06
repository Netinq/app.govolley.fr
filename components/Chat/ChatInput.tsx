import { Component, Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";

type Props = {
  inputValue: string,
  setInputValue: (text: string) => void,
  placeholder: string,
  style?: ViewStyle,
  onPress?: () => {}
}

export default class ChatInput extends Component<Props> {

  
  render() {
    
    return (
      <TextInput
          onPressIn={this.props.onPress}
          style={[this.styles.chat, this.props.style]}
          placeholder={this.props.placeholder}
          value={this.props.inputValue}
          onChangeText={this.props.setInputValue}
          placeholderTextColor='#E6E6E6'
        />
    )

  }

  styles = StyleSheet.create({
    chat: {
      paddingHorizontal: 35,
      paddingVertical: 20,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderTopRightRadius: 0,
      width: '100%',
      marginBottom: 25,
      fontFamily: 'franklin-gothic-medium',
      fontSize: 18,
      color: '#353535'
    },
  })

}