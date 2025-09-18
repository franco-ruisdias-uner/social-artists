import {View, Text, StyleSheet} from "react-native";
import {materialColors} from "@utils/colors";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Cuadrado from "@app/tabs/screens/my-network/cuadrado";

export default function MyNetworkScreen() {


  return (
      <GestureHandlerRootView style={styles.container}>
        <Cuadrado/>
      </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  }
})