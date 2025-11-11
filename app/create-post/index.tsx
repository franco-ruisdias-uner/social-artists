import {Text, StyleSheet, TextInput} from 'react-native'
import {materialColors} from "@utils/colors";
import {useEffect, useState, useRef, useCallback} from "react";
import {sizes} from "@utils/sizes";
import {
  KeyboardAwareScrollView,
  KeyboardController,
  useReanimatedKeyboardAnimation
} from "react-native-keyboard-controller";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import PostHeader from "@app/create-post/post-header";
import PostActions from "@app/create-post/post-actions";
import ImagePreview from "@app/create-post/image-preview";
import * as ImagePicker from 'expo-image-picker';
import {uploadImage} from "@shared/helpers/upload-image";
import axiosClient from "@core/api";
import {useNavigation, useRoute} from "@react-navigation/native";
import Toast from 'react-native-toast-message'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ScheduleSheet from "@app/create-post/schedule-sheet";
import {scheduleNotification} from "@shared/helpers/schedule-notification";
import {MODAL_ROUTES} from "@utils/constants";
import {SchedulableTriggerInputTypes} from "expo-notifications";
import {CreatePostNotification} from "@shared/interfaces/create-post-notification";


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
  const route = useRoute()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: withTiming((animatedKeyboard.height.value * -1) === 0 ? insets.bottom : (animatedKeyboard.height.value * -1), {duration: 0}),
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
      setPhoto({uri: result.assets[0].uri, base64: undefined})
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
        setPhoto({uri: result.assets[0].uri, base64: undefined})
      }
    });
  }

  const createPost = async (imageUrl: string | undefined) => {
    if (!text) {
      return
    }
    const createPost: CreatePostBody = {text: text}
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

  const handleOnScheduledDate = async (date: Date) => {
    const formattedDate = date.toLocaleString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Argentina/Buenos_Aires',
    });
    // Create notification body with post preview if available
    const postPreview = text && text.length > 0
        ? (text.length > 50 ? `${text.substring(0, 50)}...` : text)
        : 'Tu post programado';
    const notificationBody = `Programado para: ${formattedDate}${text ? `\n\n${postPreview}` : ''}`;
    scheduleNotification({
      // date,
      trigger: {seconds: 15, repeats: false, type: SchedulableTriggerInputTypes.TIME_INTERVAL},
      title: 'Recordatorio de posteo',
      body: notificationBody,
      sound: true,
      data: {
        navigateTo: MODAL_ROUTES.CREATE_POST,
        params: {
          scheduledDate: date.toISOString(),
          text: text || '',
          photoBase64: photo?.base64 || undefined
        }
      }
    }, {
      onSuccess: (notificationId) => {

        Toast.show({
          type: 'success',
          text1: 'Recordatorio programado',
          text2: `Te notificaremos el ${formattedDate}`,
        });
        setBottomSheetOpened(false);
        setText(undefined);
        setPhoto(undefined);
        navigation.goBack();
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error al programar el recordatorio',
          text2: error.message,
        });
      },
    });
  }


  useEffect(() => {
    KeyboardController.setFocusTo("next")
  }, []);

  // Prepopulate form when opened from notification
  useEffect(() => {
    const params = route.params as CreatePostNotification | undefined;
    if (params?.text) {
      setText(params.text);
    }
    if (params?.photoBase64) {
      // Create a data URI from base64 to display the image
      const dataUri = `data:image/jpeg;base64,${params.photoBase64}`;
      setPhoto({ uri: dataUri, base64: params.photoBase64 });
    }
  }, [route.params]);

  return (
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={[
          styles.container,
          animatedStyle
        ]}>
          <PostHeader/>
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
              <ImagePreview onPress={() => setPhoto(undefined)} uri={photo.uri}/>
            }
          </KeyboardAwareScrollView>
          <PostActions
              showScheduleSheet={setBottomSheetOpened}
              postEnabled={!!text}
              onPostPressed={handleOnPost}
              showGallery={handleShowGallery}
              showCamera={launchCamera}/>

        </Animated.View>
        <ScheduleSheet hidden={!bottomSheetOpened} onScheduledDate={handleOnScheduledDate}/>

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