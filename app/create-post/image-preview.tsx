import {Image} from "expo-image";
import {JSX} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {materialColors} from "@utils/colors";

interface Props {
  uri: string;
  onPress: () => void;
}

export default function ImagePreview(props: Props): JSX.Element {
  const {uri, onPress} = props;

  return (
      <View style={styles.container}>
        <Pressable onPress={onPress}
                   style={({pressed}) => [
                     {opacity: pressed ? 0.5 : 1.0}, styles.deleteButton
                   ]}>
          <MaterialIcons name="close" size={18} color={materialColors.schemes.light.onSurface}/>
        </Pressable>
        <Image source={{uri: uri}} style={styles.image}/>

      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    padding: 16,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,

  },
  deleteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    top: 4,
    right: 4,
    backgroundColor: "white",

    borderRadius: 24,
    zIndex: 10
  }
})