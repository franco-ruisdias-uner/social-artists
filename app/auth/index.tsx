import {SafeAreaView, StyleSheet} from "react-native";
import Login from "./Login";
import {useState} from "react";
import Register from "./Register";
import {materialColors} from "../../utils/colors";
import RegisterHooks from "./Register-hooks";


export default function Auth() {

  const [showRegister, setShowRegister] = useState<boolean>(false)

  return (
      <SafeAreaView style={styles.container}>
        {
          showRegister ? <RegisterHooks onLoginClicked={() => setShowRegister(false)}/> :
              <Login onRegisterClicked={() => setShowRegister(true)}/>
        }
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  },
})