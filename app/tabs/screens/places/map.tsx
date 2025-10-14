import {StyleSheet, Alert} from 'react-native'
import MapView, {Marker, MAP_TYPES} from "react-native-maps";
import {IPlace} from "@shared/models";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

interface Props {
  places: IPlace[];
  placeSelected: (place: IPlace) => void
}

export default function Map(props: Props) {
  const {places, placeSelected} = props;
  const [region, setRegion] = useState(DEFAULT_REGION)
  const handleMarkerSelected = (place: IPlace) => {
    placeSelected(place)
  }

  const getLocation =async () =>{
    const location = await Location.getCurrentPositionAsync()
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    const address = await Location.geocodeAsync("Buenos Aires, Argentina")
    console.log(address)
    setRegion({
      latitude: address[0].latitude,
      longitude: address[0].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }


  const getPermissions = async () => {
    let {status, ios, android, expires, granted, canAskAgain} = await Location.requestForegroundPermissionsAsync()

    console.log(status)
    console.log(ios)
    console.log(android)
    console.log(expires)
    console.log(granted)

    if (status !== 'granted') {
      if (!canAskAgain) {
        Alert.alert("Permiso denegado", "Necesitamos que lo habilites en configuracion", [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
          },
        ])
        return
      }
      Alert.alert("Permiso denegado", "Necesitamos permiso para acceder a tu ubicación", [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => getPermissions(),
        },
      ])
      return
    } else if (granted){
      getLocation()
    }

  }

  useEffect(() => {
    getPermissions()
  }, []);

  return (
      <MapView style={styles.map}
               mapType={MAP_TYPES.HYBRID}
               userLocationPriority={'high'}
               region={region}
               showsUserLocation={true}>
        {
          places.map((place) => (
              <Marker
                  key={place.id.toString()}
                  id={place.id.toString()}
                  onPress={({nativeEvent}) => handleMarkerSelected(place)}
                  coordinate={{latitude: place.coords.lat, longitude: place.coords.long}}/>
          ))
        }
      </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
})