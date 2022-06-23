import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TerrainTabScreenProps } from '../../types';

type routeParams = {
  area_uuid: undefined;
}

export default function TerrainPage({ navigation, route }: TerrainTabScreenProps<'TerrainPage'>) {

  const [area, setArea] = useState({
    area_uuid: "",
    area_surface: 0,
    areas_nb: 0,
    adress: "",
    latitude: 0,
    longitude: 0,
    image_data: {
      data: []}
  });

  const getArea = async () => {

    let headers = new Headers();
    headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
    headers.append("Content-Type", "application/json");

    const options = {
      method: 'GET',
      headers: headers,
    }

    fetch(`https://dev.govolley.fr/area/${route.params.area_uuid}`, options)
      .then(response => response.json())
      .then((result) => {
        setArea(result)
      })
      .catch(error => console.log('error', error))
  }

  useEffect(() => {
    getArea()
  })

  const uuid = route.params.area_uuid

  if (!area) return null;
  else return (
    <View style={styles.container}>
      <Text style={styles.title}>ID : {area.adress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
