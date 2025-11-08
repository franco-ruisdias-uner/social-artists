import {Pressable, StyleSheet, Text, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {materialColors} from "@utils/colors";
import {baseStyles} from "@utils/base-styles";
import {useNavigation} from "@react-navigation/native";
import {sizes} from "@utils/sizes";

interface Props {
  
}


export default function PostHeader(props: Props) {
  const navigation = useNavigation()
  return (
      <View style={styles.header}>
        <Pressable
            onPress={() => navigation.goBack()}
            style={({pressed}) => [
              {opacity: pressed ? 0.5 : 1.0}
            ]}>
          <MaterialIcons name={'close'} size={24} color={materialColors.schemes.light.onSurface}/>
        </Pressable>
        <Text style={[baseStyles.textBase, styles.headerTitle]}>Crear
          Post</Text>
        
      </View>
  )
}

const styles = StyleSheet.create({
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
})