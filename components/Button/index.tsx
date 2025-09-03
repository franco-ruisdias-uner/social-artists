import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {materialColors} from "../../utils/colors";


interface IProps {
  onPress: () => void;
  disabled?: boolean,
  title: string
}


export default function Button(props: IProps) {

  const {onPress, disabled, title} = props

  return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={{...styles.container, ...(disabled && styles.disabledContainer)}}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: materialColors.schemes.light.primary,
    borderRadius: 8,
    padding: 12,
  },
  disabledContainer: {
    backgroundColor: materialColors.coreColors.neutral,
  },
  text: {
    color: materialColors.schemes.light.onPrimary,
  }
})