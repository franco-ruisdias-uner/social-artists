import {View, StyleSheet, Text} from "react-native";
import {materialColors} from "@utils/colors";
import {IPlace} from "@shared/models";


interface Props {
  item: IPlace
}

export default function PlaceItem(props: Props) {
  const {item} = props;

  return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: materialColors.schemes.light.surface,
    borderWidth: 0.75,
    borderColor: materialColors.palettes.neutral["0"],
  },
  title: {
    fontSize: 14,
    color: materialColors.schemes.light.onSurface,
  }
})