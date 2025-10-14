import {Pressable, StyleSheet, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {materialColors} from "@utils/colors";
import {sizes} from "@utils/sizes";
import {useCameraPermissions} from "expo-camera";

interface Props {
  showCamera: () => void;
}

export default function PostActions(props: Props) {
  const {showCamera} = props;
  const [permission, requestPermission] = useCameraPermissions();

  const handleShowCamera = () => {
    if (!permission?.granted) {
      requestPermission().then(result => {
        if (result.granted) {
          showCamera();
        }
      });
    } else {
      showCamera();
    }
  }


  return (
      <View style={styles.actionsContainer}>
        <Pressable onPress={handleShowCamera} style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1.0}
        ]}>
          <MaterialIcons name="camera-alt" size={24} color={materialColors.schemes.light.onSurface}/>
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    width: '100%',
    backgroundColor: materialColors.schemes.light.surface,
    borderTopWidth: 0.5,
    borderTopColor: materialColors.schemes.light.outlineVariant,
    paddingVertical: sizes.defaultPadding.vertical,
    paddingHorizontal: sizes.defaultPadding.horizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  }
})