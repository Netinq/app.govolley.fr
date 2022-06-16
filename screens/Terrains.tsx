import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Background } from '../components/Background';

import EditScreenInfo from '../components/EditScreenInfo';
import { Header } from '../components/Header';
import { BigBox } from '../components/Terrains/BigBox';
import { Box } from '../components/Terrains/Box';
import { Title } from '../components/Texts/Title';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Terrain({ navigation }: RootTabScreenProps<'Terrains'>) {

  const [isScrolled, setScrolled] = useState(false);

  return (
    <View style={styles.container}>
      <Background />
      <Header />
      <ScrollView onScroll={({nativeEvent}) => nativeEvent.contentOffset.y >= 5 ? setScrolled(true) : setScrolled(false)}>
      <Title title='Proche de vous' style={{marginTop: 25}}></Title>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView} horizontal={true}>
          <View style={styles.spacer}></View>
          <Box navigation={navigation} id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <Box navigation={navigation} id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <Box navigation={navigation} id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <Box navigation={navigation} id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <View style={styles.spacer}></View>
        </ScrollView>
        <Title title='Tous les terrains'></Title>
        <View style={styles.allContainter}>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
          <BigBox id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></BigBox>
        </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 200,
  },
  scrollView: {
    marginTop: 25,
    height: 250,
  },
  spacer: {
    height: 250,
    width: 30,
    backgroundColor: 'transparent'
  },
  allContainter: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 35,
    backgroundColor: 'transparent',
    paddingBottom: 100
  }
});
