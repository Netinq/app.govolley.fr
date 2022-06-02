import { Image, StyleSheet, View } from "react-native";

export function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('../assets/images/favicon.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 50,
    flex: 1,
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  logo: {
    height: 75,
    width: 75
  }
})