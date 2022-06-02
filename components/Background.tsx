import { Component, ElementType, PropsWithChildren, ReactPropTypes } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Layout from "../constants/Layout";

export class Background extends Component{
  
  render() {
    
    const image = require('../assets/images/background.jpg');
    
    return (<ImageBackground source={image} resizeMode="cover" style={this.styles.style}></ImageBackground>
    );
  }

  styles = StyleSheet.create({
    style: {
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: Layout.window.width,
      height: Layout.window.height
    }
  })
}