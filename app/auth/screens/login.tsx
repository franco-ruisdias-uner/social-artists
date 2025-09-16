import {View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView} from "react-native";
import {sizes} from "@utils/sizes";
import {useContext, useEffect, useState} from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import {materialColors} from "@utils/colors";
import {useNavigation} from "@react-navigation/native";
import {AUTH_ROUTES} from "@utils/constants";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {AUTH_ACTIONS, AuthContext} from "@shared/context/AuthContext";


export default function Login() {
  // const {onRegisterClicked} = props
  const {state, dispatch} = useContext(AuthContext)
  const navigation = useNavigation()
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [pass, setPass] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isEnabled, setIsEnabled] = useState<boolean>(true)
  const [showPass, setShowPass] = useState<boolean>(true)


  const handleLogin = () => {

    if (!pass || !email) {
      setError('Debe completar ambos campos')
      return;
    }
    dispatch({
      type: AUTH_ACTIONS.LOGIN, payload: {
        token: "TOKEN",
        refreshToken: "REFRESH_TOKEN",
        user: {
          id: "ID",
          nombre: "Franco",
          apellido: "Ruis Dias",
          email: "franco.ruisdias@uner.edu.ar"
        }
      }
    })
    console.log(email, pass)
  }

  const handleGoToRegister = () => {

    navigation.navigate(AUTH_ROUTES.REGISTER, {'name': 'register'})
  }

  useEffect(() => {
    setIsEnabled(email !== undefined && pass !== undefined)
  }, [email, pass])

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <Text style={styles.titulo}>Bienvenido!</Text>
        <TextInput
            keyboardType={"email-address"}
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
        />
        <View style={styles.passContainer}>
          <TextInput
              secureTextEntry={!showPass}
              placeholder="contraseña"
              value={pass}
              onChangeText={setPass}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <MaterialIcons name={showPass ? "visibility-off" : "visibility"} size={24} color="black"/>
          </TouchableOpacity>
        </View>
        <Link link="Me olvide la contraseña" onPress={() => console.log("Me olvide la contraseña")}/>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.divider}/>
        <Button onPress={handleLogin} disabled={!isEnabled} title="Iniciar Sesion!"/>
        <View style={styles.divider}/>
        <Link link="Registrarse!" onPress={handleGoToRegister}/>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: materialColors.schemes.light.surface,
  },
  titulo: {
    fontSize: sizes.titulo,
    fontWeight: 'bold',
    color: materialColors.schemes.light.primary,
  },
  passContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomColor: materialColors.schemes.light.outline,
    borderBottomWidth: 1,
    minWidth: 300,
  },
  input: {
    height: 50,
    marginTop: 16,
    borderBottomColor: materialColors.schemes.light.outline,
    borderBottomWidth: 1,
    minWidth: 300,
  },
  divider: {
    height: 16
  },
  error: {
    color: materialColors.schemes.light.error,
    fontSize: 10
  }
})