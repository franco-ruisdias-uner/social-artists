import {Alert, Pressable, StyleSheet, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {materialColors} from "@utils/colors";
import {sizes} from "@utils/sizes";
import {useMediaLibraryPermissions, useCameraPermissions} from "expo-image-picker";

interface Props {
  showCamera: () => void;
  showGallery: () => void;
}

export default function PostActions(props: Props) {
  const {showCamera, showGallery} = props;
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions()


  const handleShowGallery = () => {
    if (!mediaLibraryPermission?.granted) {
      requestMediaLibraryPermission().then(result => {
        if (result.granted) {
          showGallery();
        }
      })
    } else {
      showGallery();
    }
  }

  const handleShowCamera = () => {
    if (!cameraPermission?.granted) {

      requestCameraPermission().then(cameraPermission => {
        if (cameraPermission.granted) {
          showCamera()
        }
      })
    } else {

      showCamera()
    }
  }


  return (
      <View style={styles.actionsContainer}>
        <Pressable onPress={handleShowGallery} style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1.0}
        ]}>
          <MaterialIcons name="image" size={24} color={materialColors.schemes.light.onSurface}/>
        </Pressable>
        <Pressable onPress={handleShowCamera} style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1.0}
        ]}>
          <MaterialIcons name="camera" size={24} color={materialColors.schemes.light.onSurface}/>
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
    justifyContent: 'flex-start',
    gap: 16,
    alignItems: 'center',

  }
})