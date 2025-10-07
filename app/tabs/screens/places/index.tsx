import {StyleSheet, View, Text} from "react-native";
import {materialColors} from "@utils/colors";
import {useState} from "react";
import Map from "@app/tabs/screens/places/map";
import {PLACES} from "@utils/dummy-data";
import MapListSwitcher from "@app/tabs/screens/places/map-list-switcher";
import {mapListType} from "@utils/enums";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {IPlace} from "@shared/models";


const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

interface Polyline {
  latitude: number,
  longitude: number
}

export default function PlacesScreen() {
  const insets = useSafeAreaInsets()

  const [mapListTypeSelected, setMapListTypeSelected] = useState<mapListType>(mapListType.MAP)
  const [placeSelected, setPlaceSelected] = useState<IPlace | null>(null)
  return (
      <View style={styles.container}>
        {
          mapListTypeSelected === mapListType.LIST ?
              <View style={{paddingTop: insets.top + 60, position: 'absolute'}}>
                <Text>LISTA</Text>
              </View>
              :
              <Map places={PLACES} placeSelected={setPlaceSelected}/>
        }
        {
            placeSelected && (
                <View style={{bottom: insets.bottom, position: 'absolute', backgroundColor: 'white'}}>
                  <Text>{placeSelected.title}</Text>
                </View>
            )
        }

        <MapListSwitcher typeSelected={mapListTypeSelected} onTypeChanged={setMapListTypeSelected}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  }
})