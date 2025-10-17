import {Alert, Pressable, StyleSheet, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {materialColors} from "@utils/colors";
import {sizes} from "@utils/sizes";
// import {useCameraPermissions} from "expo-camera";
import {useMediaLibraryPermissions, useCameraPermissions} from "expo-image-picker";

interface Props {
  showCamera: () => void;
  showGallery: () => void;
  showCameraAlt: () => void;
}

export default function PostActions(props: Props) {
  const {showCamera, showGallery, showCameraAlt} = props;
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

  const handleShowCameraAlt = () => {

    console.log(cameraPermission)
    if (!cameraPermission?.granted) {

      requestCameraPermission().then(cameraPermission => {
        if (cameraPermission.granted) {
          showCameraAlt()
        }
      })
    } else {

      showCameraAlt()
    }
  }

  const handleShowCamera = () => {
    if (!cameraPermission?.granted) {
      requestCameraPermission().then(result => {
        if (result.granted) {
          showCamera();
        } else{

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
        <Pressable onPress={handleShowGallery} style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1.0}
        ]}>
          <MaterialIcons name="image" size={24} color={materialColors.schemes.light.onSurface}/>
        </Pressable>
        <Pressable onPress={handleShowCameraAlt} style={({pressed}) => [
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