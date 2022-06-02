import { Component, ElementType, PropsWithChildren, ReactPropTypes } from "react";
import { ImageBackground } from "react-native";

export class Background extends Component{
  
  render() {
    
    const image = require('../assets/images/background.jpg');
    
    return (<ImageBackground source={image} resizeMode="cover" style={{ justifyContent: "center" }}>
          {this.props.children}
        </ImageBackground>
    );
  }
}