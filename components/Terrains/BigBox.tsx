import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, Text } from "react-native";
import Layout from "../../constants/Layout";
import { View } from "../Themed";

export function BigBox(props: {
  tags: Array<String>;
  distance: number;
  note: number;
  id: string;
}) {
  
  const calculateDistance = props['distance'] + ' km';

  return (
    <View style={styles.content}>
      <View style={styles.contentImage}>
        <Image style={styles.image} source={require('../../assets/images/terrains.jpg')} />
        <View style={styles.tagContent}>
          {props['tags'].map((tag, i) => 
            <Text style={styles.tag} key={i}>{tag}</Text>
          )}
        </View>
      </View>
      <View style={styles.bar}>
        <View style={styles.infoBar}>
          <View style={styles.info}>
            <Image style={styles.infoIcon} source={require('../../assets/images/icon.png')} />
            <Text style={styles.infoText}>{calculateDistance}</Text>
          </View>
          <View style={styles.info}>
            <FontAwesome size={20} name='star' color='#ECA338' />
            <Text style={styles.infoText}>{props['note']}</Text>
          </View>
        </View>
        <View style={styles.see}>
          <FontAwesome5 size={20} name='eye' color='#fff' />
          <Text style={styles.seeText}>Voir</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    height: 225,
    width: Layout.window.width - 70,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 15
  },
  contentImage: {
    height: 175,
    width: Layout.window.width - 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Layout.window.width - 70,
    height: 175,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  tagContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: 'transparent'
  },
  tag: {
    fontFamily: 'franklin-gothic-medium',
    fontSize: 12,
    color: '#fff',
    padding: 10,
    backgroundColor: '#FCB040',
    margin: 5,
    borderRadius: 25,
  },
  bar: {
    width: Layout.window.width - 70,
    height: 50,
    backgroundColor: 'transparent'
  },
  see: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#FCB040',
    position: 'absolute',
    right: 0,
    top: 0,
    height: 50,
    width: 50
  },
  seeText: {
    fontFamily: 'franklin-gothic',
    fontSize: 10,
    color: '#fff',
    marginTop: 0,
    textTransform: "uppercase"
  },
  infoBar: {
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
    paddingRight: 50,
    backgroundColor: 'transparent'
  },
  info: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: 'transparent'
  },
  infoIcon: {
    height: 30,
    width: 30
  },
  infoText: {
    fontFamily: 'calibri-bold',
    fontSize: 13,
    color: '#353535',
    marginLeft: 5
  }
})