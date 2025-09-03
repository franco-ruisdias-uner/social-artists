import {View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable, Platform} from "react-native";
import {colors, sizes} from "../../utils";
import {useEffect, useState} from "react";
import Button from "../../components/Button";
import Link from "../../components/Link";
import {materialColors} from "../../utils/colors";


interface IProps {
  onRegisterClicked: () => void
}


export default function Login(props: IProps) {
  const {onRegisterClicked} = props
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

    console.log(email, pass)
  }

  useEffect(() => {
    setIsEnabled(email !== undefined && pass !== undefined)
  }, [email, pass])

  return (
      <View style={styles.container}>
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
              style={styles.input}
              placeholder="contraseña"
              value={pass}
              onChangeText={setPass}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Text>{showPass ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
        <Link link="Me olvide la contraseña" onPress={() => console.log("Me olvide la contraseña")}/>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.divider}/>
        <Button onPress={handleLogin} disabled={!isEnabled} title="Iniciar Sesion!"/>
        <View style={styles.divider}/>
        <Link link="Registrarse!" onPress={onRegisterClicked}/>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
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