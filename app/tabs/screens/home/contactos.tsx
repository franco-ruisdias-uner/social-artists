import {SectionList, StyleSheet, View, Text} from "react-native";
import {materialColors} from "@utils/colors";

interface Contacto {
  id: string;
  nombre: string;
}


interface Section {
  title: string;
  data: Contacto[];
}

const sections: Section[] = [
  {title: 'A', data: [{id: '1', nombre: 'Arturo'}, {id: '2', nombre: 'Alfonso'}]},
  {title: 'B', data: [{id: '3', nombre: 'Brian'}, {id: '4', nombre: 'Blanca'}]},
]

export default function Contactos() {
  return (

      <View style={styles.container}>
        <SectionList
            style={{padding: 8}}
            sections={sections}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => <Text>{item.nombre}</Text>}
            renderSectionHeader={({section}) =>
                <View style={{padding: 8}}>
                  <Text style={{fontWeight: 'bold'}}>{section.title}</Text>
                </View>}
        />


      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  }
})