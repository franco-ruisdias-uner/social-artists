import {View, Text, StyleSheet, Pressable, TextInput, ScrollView, Platform} from 'react-native'
import {materialColors} from "@utils/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {baseStyles} from "@utils/base-styles";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
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
import PostCamera from "@app/create-post/post-camera";
import {CameraCapturedPicture} from "expo-camera";
import ImagePreview from "@app/create-post/image-preview";

export default function CreatePostModal() {
  const insets = useSafeAreaInsets()
  const animatedKeyboard = useReanimatedKeyboardAnimation();
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [text, setText] = useState<string>()
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: withTiming((animatedKeyboard.height.value * -1) === 0 ? insets.bottom : (animatedKeyboard.height.value * -1), {duration: 0}),
    };
  });

  const handlePictureTaken = (picture: CameraCapturedPicture) => {
    console.log(`NUEVA FOTO: ${JSON.stringify(picture)}`);
    setPhoto(picture)
    setShowCamera(false)
  }

  useEffect(() => {
    KeyboardController.setFocusTo("next")
  }, []);

  return (
      <View style={{flex: 1}}>
        {
          showCamera ?
              <PostCamera pictureTaken={handlePictureTaken} closeCamera={() => setShowCamera(false)}/>
              :
              <Animated.View style={[
                styles.container,
                animatedStyle
              ]}>
                <PostHeader postEnabled={!!text}/>
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
                    <ImagePreview onPress={() => setPhoto(undefined)} uri={photo.uri} base64={photo.base64}/>
                  }
                </KeyboardAwareScrollView>
                <PostActions showCamera={() => setShowCamera(!showCamera)}/>

              </Animated.View>
        }

      </View>
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
  }
})