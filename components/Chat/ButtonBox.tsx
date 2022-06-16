import { Component } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import Layout from "../../constants/Layout";

type Props = {
  style?: ViewStyle;
};

export default class ButtonBox extends Component<Props> {

  render() {

    return (
      <View style={[this.styles.buttonContainer, this.props.style]}>
        {this.props.children}
      </View>
    )

  }

  styles = StyleSheet.create({
    buttonContainer: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  })

}