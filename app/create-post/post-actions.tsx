import { Pressable, StyleSheet, View, Text } from "react-native";
import { useCallback, useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { materialColors } from "@utils/colors";
import { sizes } from "@utils/sizes";
import { useMediaLibraryPermissions, useCameraPermissions } from "expo-image-picker";


interface Props {
  showCamera: () => void;
  showGallery: () => void;
  onPostPressed: () => void;
  showScheduleSheet: (show: boolean) => void;
  postEnabled: boolean;
}

export default function PostActions(props: Props) {
  const { showCamera, showGallery, onPostPressed, postEnabled, showScheduleSheet } = props;
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions()

  const onLongPress = () => {
    console.log("ON LONG PRESS");
    
    showScheduleSheet(true);
  }



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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={handleShowGallery} style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]}>
          <MaterialIcons name="image" size={24} color={materialColors.schemes.light.onSurface} />
        </Pressable>
        <Pressable onPress={handleShowCamera} style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]}>
          <MaterialIcons name="camera" size={24} color={materialColors.schemes.light.onSurface} />
        </Pressable>
      </View>
      <Pressable onPress={onPostPressed}
        onLongPress={onLongPress}
        disabled={!postEnabled}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]}>
        <MaterialIcons name="send" size={24}
          color={postEnabled ? materialColors.schemes.light.primary : materialColors.schemes.light.onSurface} />
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: materialColors.schemes.light.surface,
    borderTopWidth: 0.5,
    borderTopColor: materialColors.schemes.light.outlineVariant,
    paddingVertical: sizes.defaultPadding.vertical,
    paddingHorizontal: sizes.defaultPadding.horizontal,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
})