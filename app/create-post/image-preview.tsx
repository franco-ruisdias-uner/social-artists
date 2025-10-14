import {Image} from "expo-image";
import {JSX, useMemo} from "react";
import {Pressable, StyleSheet} from "react-native";

interface Props {
  uri: string;
  base64?: string;
  onPress: () => void;
}

export default function ImagePreview(props: Props): JSX.Element {
  const {uri, base64, onPress} = props;
  //

  const imageBase64Source = useMemo(() => {
    if (base64) {
      return `data:image/jpeg;base64,${base64}`
    }
  }, [base64])


  return (
      <Pressable onPress={onPress}
                 style={({pressed}) => [
                   {opacity: pressed ? 0.5 : 1.0}
                 ]}
      >
        <Image source={{uri: imageBase64Source}} style={styles.image}/>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  }
})