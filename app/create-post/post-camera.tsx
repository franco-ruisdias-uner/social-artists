import {Pressable, StyleSheet, View, Text} from "react-native";
import {CameraCapturedPicture, CameraType, CameraView} from "expo-camera";
import {materialColors} from "@utils/colors";
import {useRef, useState} from "react";

interface Props {
  closeCamera: () => void;
  pictureTaken: (picture: CameraCapturedPicture) => void;
}

export default function PostCamera(props: Props) {
  const {closeCamera, pictureTaken} = props
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null)


  const handleTakePicture = () => {
    if (!cameraRef.current) {
      return
    }

    cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    }).then((picture) => {
      pictureTaken(picture)
    })

  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
      <View style={styles.container}>
        <CameraView style={{flex: 1}} ref={cameraRef}/>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleTakePicture}>
            <Text style={styles.text}>Tomar Foto</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={closeCamera}>
            <Text style={styles.text}>CERRAR</Text>
          </Pressable>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: materialColors.schemes.dark.onSurface,
  },
})