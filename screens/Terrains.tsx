import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Header } from '../components/Header';
import { BigBox } from '../components/Terrains/BigBox';
import { Box } from '../components/Terrains/Box';
import { Title } from '../components/Texts/Title';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Terrains'>) {
  return (
    <View style={styles.container}>
      <Header></Header>
      <ScrollView>
      <Title title='Proche de vous'></Title>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView} horizontal={true}>
          <View style={styles.spacer}></View>
          <Box id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <Box id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <Box id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
          <Box id='test' distance={15} note={4.5} tags={['2 Terrains', 'Beach']} ></Box>
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
    paddingTop: 150,
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
