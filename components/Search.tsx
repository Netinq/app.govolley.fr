import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Button, Keyboard, StyleSheet, TextInput } from "react-native";
import { View } from "./Themed";

export function Search() {
  
  const [searchPhrase, setSearchPhrase] = useState("");
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Bordeaux, Gironde..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          placeholderTextColor='#E6E6E6'
        />
        <FontAwesome5 style={styles.icon} name="search" size={20} onPress={() => {
              Keyboard.dismiss();
            }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: 'transparent',
    marginTop: 15
  },
  searchBar: {
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 25,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FEFEFE",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: 'center'
  },
  input: {
    fontSize: 15,
    width: "100%"
  },
  icon: {
    color: '#C8C8C8',
  }
});