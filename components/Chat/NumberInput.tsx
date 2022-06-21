import { FontAwesome5 } from "@expo/vector-icons";
import { Component, Dispatch, SetStateAction, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NumberInput(props: {
  min?: number,
  count: number,
  setCount: Dispatch<SetStateAction<number>>,
}) {

  const min = props.min || 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={props.count-min < min ? styles.press__disable : styles.press} onPress={props.count-min < min ? ()=>{} : (() => props.setCount(props.count-1))}>
        <FontAwesome5 size={15} color="#fff" name="minus" />
      </TouchableOpacity>
      <View style={styles.containerText}>
        <Text style={styles.text}>{props.count}</Text>
      </View>
      <TouchableOpacity style={[styles.press, {borderTopRightRadius: 0}]} onPress={() => props.setCount(props.count+1)}>
        <FontAwesome5 size={15} color="#fff" name="plus" />
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  press: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCB040',
    borderRadius: 15,
  },
  press__disable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: 'franklin-gothic'
  },
  containerText: {
    height: 50,
    width: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})