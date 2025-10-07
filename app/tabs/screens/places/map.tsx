import {StyleSheet} from 'react-native'
import MapView, {Marker} from "react-native-maps";
import {IPlace} from "@shared/models";

interface Props {
  places: IPlace[];
  placeSelected: (place: IPlace) => void
}

export default function Map(props: Props) {
  const {places, placeSelected} = props;

  const handleMarkerSelected = (place: IPlace) => {
    placeSelected(place)
  }

  return (
      <MapView style={styles.map}
               followsUserLocation={true}
               userLocationPriority={'high'}
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