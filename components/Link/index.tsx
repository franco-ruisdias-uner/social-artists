import {Pressable, Text, StyleSheet} from "react-native";
import {colors} from "../../utils";
import {materialColors} from "../../utils/colors";

interface IProps {
  link: string,
  onPress: () => void
}

export default function Link(props: IProps) {

  const {link, onPress} = props;


  return (
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{link}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    color: materialColors.schemes.light.tertiary,
  }
})