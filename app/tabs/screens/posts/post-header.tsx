import {View, StyleSheet, Text, Pressable} from "react-native";
import {materialColors} from "@utils/colors";
import {sizes} from "@utils/sizes";
import {useNavigation} from "@react-navigation/native";
import {MODAL_ROUTES} from "@utils/constants";


interface Props {

}

export function PostHeader(props: Props) {
  const navigation = useNavigation();
  return (
      <Pressable onPress={() => navigation.navigate(MODAL_ROUTES.CREATE_POST as never)} style={({pressed}) => [
        {opacity: pressed ? 0.5 : 1.0}
      ]}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.profilePicture}/>
            <Text style={styles.inputText}>Haz saber que piensas!</Text>
          </View>
        </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: materialColors.schemes.light.surfaceContainer,
    paddingBottom: 8
  },
  innerContainer: {
    width: '100%',
    backgroundColor: materialColors.schemes.light.surface,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: sizes.defaultPadding.vertical,
    paddingHorizontal: sizes.defaultPadding.horizontal,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: materialColors.schemes.light.tertiary,
  },
  inputText: {
    fontSize: 14,
    fontWeight: 300,
  }
})