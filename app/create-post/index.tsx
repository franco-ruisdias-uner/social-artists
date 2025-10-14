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

export default function CreatePostModal() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const animatedKeyboard = useReanimatedKeyboardAnimation();

  const [isFormValid, setFormValid] = useState<boolean>(false)
  const [text, setText] = useState<string>()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: withTiming((animatedKeyboard.height.value * -1) === 0 ? insets.bottom : (animatedKeyboard.height.value * -1), {duration: 0}),
    };
  });

  useEffect(() => {
    KeyboardController.setFocusTo("next")
  }, []);

  return (
      <Animated.View style={[
        styles.container,
        animatedStyle
      ]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1.0}
          ]}>
            <MaterialIcons name={'close'} size={24} color={materialColors.schemes.light.onSurface}/>
          </Pressable>
          <Text style={[baseStyles.textBase, styles.headerTitle]}>Crear
            Post</Text>
          <Pressable style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1.0}
          ]}>
            <Text style={[baseStyles.textBase, isFormValid && styles.headerRight]}>Postear</Text>
          </Pressable>
        </View>
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
          <View style={styles.photoPlaceHolder}/>
        </KeyboardAwareScrollView>
        <View style={[styles.actionsContainer]}>
          <Pressable onPress={console.log}>
            <MaterialIcons name="camera-alt" size={24} color={materialColors.schemes.light.onSurface}/>
          </Pressable>
        </View>

      </Animated.View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: sizes.defaultPadding.horizontal,
    paddingBottom: sizes.defaultPadding.vertical,
    borderBottomWidth: 0.5,
    backgroundColor: materialColors.schemes.light.surface,
    borderBottomColor: materialColors.schemes.light.outlineVariant,
  },
  headerTitle: {fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'},
  headerRight: {color: materialColors.schemes.light.primary},
  input: {
    paddingHorizontal: sizes.defaultPadding.horizontal,
    marginTop: sizes.defaultPadding.vertical,
    marginBottom: 24
  },
  photoPlaceHolder: {
    height: 200, width: '100%', backgroundColor: materialColors.schemes.light.secondary
  },
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