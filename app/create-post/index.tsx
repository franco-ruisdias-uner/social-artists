import { Text, StyleSheet, TextInput } from 'react-native'
import { materialColors } from "@utils/colors";
import { useEffect, useState, useRef, useCallback } from "react";
import { sizes } from "@utils/sizes";
import {
  KeyboardAwareScrollView,
  KeyboardController,
  useReanimatedKeyboardAnimation
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import PostHeader from "@app/create-post/post-header";
import PostActions from "@app/create-post/post-actions";
import ImagePreview from "@app/create-post/image-preview";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "@shared/helpers/upload-image";
import axiosClient from "@core/api";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScheduleSheet from "@app/create-post/schedule-sheet";


interface CreatePostBody {
  text: string;
  imageUrl?: string;
}

export default function CreatePostModal() {
  const insets = useSafeAreaInsets()
  const animatedKeyboard = useReanimatedKeyboardAnimation();
  const navigation = useNavigation()
  const [text, setText] = useState<string>()
  const [photo, setPhoto] = useState<{ uri: string, base64: string | undefined } | undefined>(undefined)
  const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: withTiming((animatedKeyboard.height.value * -1) === 0 ? insets.bottom : (animatedKeyboard.height.value * -1), { duration: 0 }),
    };
  });



  const handleShowGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri, base64: undefined })
    }
  }

  const launchCamera = () => {
    ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1
    }).then(result => {
      console.log(result);

      if (!result.canceled) {
        setPhoto({ uri: result.assets[0].uri, base64: undefined })
      }
    });
  }

  const createPost = async (imageUrl: string | undefined) => {
    if (!text) {
      return
    }
    const createPost: CreatePostBody = { text: text }
    if (imageUrl) {
      createPost.imageUrl = imageUrl
    }
    console.log(createPost)
    try {
      const response = await axiosClient.post('/posts', createPost)
      console.log(response.data);
      Toast.show({
        type: 'success',
        text1: 'Post creado exitosamente',
      })
      setText(undefined);
      setPhoto(undefined);
      navigation.goBack();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al crear el post',
        text2: error.response?.data?.message
      })
    }
  }


  const handleOnPost = async () => {
    if (!photo) {
      await createPost(undefined)
      return;
    }
    await uploadImage("posts", photo?.uri || "", {
      onSuccess: (downloadURL) => {
        createPost(downloadURL)
        // console.log(downloadURL)
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error al subir la imagen',
          text2: error.message
        })
        console.log(error)
      },
      onProgress: progress => {
        console.log(`Progreso: ${progress}`)
      }
    })
  }


  useEffect(() => {
    KeyboardController.setFocusTo("next")
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={[
        styles.container,
        animatedStyle
      ]}>
        <PostHeader />
        <KeyboardAwareScrollView
          bottomOffset={insets.top + 30}
          keyboardShouldPersistTaps={"never"}

          overScrollMode={"auto"}>
          <TextInput
            autoFocus={true}
            placeholder="Di algo"
            value={text}
            onChangeText={setText}
            multiline={true}
            style={styles.input}
            focusable={true}
          />
          {
            photo &&
            <ImagePreview onPress={() => setPhoto(undefined)} uri={photo.uri} />
          }
        </KeyboardAwareScrollView>
        <PostActions
          showScheduleSheet={setBottomSheetOpened}
          postEnabled={!!text}
          onPostPressed={handleOnPost}
          showGallery={handleShowGallery}
          showCamera={launchCamera} />

      </Animated.View>
      <ScheduleSheet hidden={!bottomSheetOpened} onScheduledDate={console.log}/>

    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  },
  input: {
    paddingHorizontal: sizes.defaultPadding.horizontal,
    marginTop: sizes.defaultPadding.vertical,
    marginBottom: 24
  },
  photoPlaceHolder: {
    height: 200, width: '100%', backgroundColor: materialColors.schemes.light.secondary
  },

})