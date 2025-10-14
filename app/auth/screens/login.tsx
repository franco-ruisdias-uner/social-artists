import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable, Dimensions, Platform,
} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import * as yup from 'yup';
import {useContext, useReducer, useState} from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import {materialColors} from "@utils/colors";
import {useNavigation} from "@react-navigation/native";
import {AUTH_ROUTES} from "@utils/constants";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {AUTH_ACTIONS, AuthContext} from "@shared/context/AuthContext";
import {useFormik} from "formik";
import {sizes} from "@utils/sizes";
import {KeyboardAvoidingView, KeyboardController} from "react-native-keyboard-controller";

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Required').label('Email'),
  password: yup.string().required('Required').label('password')
});

interface IForm {
  password: string;
  email: string;
}

const {height} = Dimensions.get('screen');
const DELAY = 750
const DURATION = 750
const offset = {closed: 0, opened: 20};

export default function Login() {
  // const {onRegisterClicked} = props
  const formContainerHeight = useSharedValue(350)
  const textTop = useSharedValue(50)
  const {dispatch} = useContext(AuthContext)
  const [isToggled, toggle] = useReducer((s) => !s, false);
  const navigation = useNavigation()
  const [showPass, setShowPass] = useState<boolean>(false)


  const onSubmit = (values: IForm) => {
    const {password, email} = values
    setTimeout(() => {
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
    }, DURATION * 2);
    KeyboardController.dismiss();
    formContainerHeight.value = withTiming(0, {duration: DURATION});
    textTop.value = withDelay(DELAY, withTiming(height + 50, {duration: DURATION}));
  }

  const handleGoToRegister = () => {
    navigation.navigate(AUTH_ROUTES.REGISTER, {'name': 'register'})
  }

  const renderPassIcon = () => {
    return (
        <Pressable onPress={() => setShowPass(!showPass)}>
          <MaterialIcons name={showPass ? "visibility-off" : "visibility"} size={24} color="black"/>
        </Pressable>
    )
  }

  const animatedViewStyles = useAnimatedStyle(() => ({
    height: formContainerHeight.value,
  }));

  const animatedTextStyles = useAnimatedStyle(() => ({
    top: textTop.value,
  }));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
  });

  return (

      <KeyboardAvoidingView style={{flex: 1}}
                            contentContainerStyle={styles.container}
                            keyboardVerticalOffset={50}
                            behavior={"position"}
      >

        <Animated.Text style={[styles.logo, animatedTextStyles]}>Social Artists</Animated.Text>
        <Animated.View style={[
          styles.formContainer,
          animatedViewStyles
        ]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.titulo]}>Bienvenido!</Text>
          </View>

          <TextInput
              keyboardType={"email-address"}
              style={styles.input}
              placeholder="email"
              autoCapitalize={"none"}
              value={formik.values.email}
              onChangeText={value => formik.setFieldValue('email', value)}
          />
          <View style={styles.passContainer}>
            <TextInput
                style={{flexGrow: 1}}
                secureTextEntry={!showPass}
                placeholder="contraseña"
                value={formik.values.password}
                onChangeText={value => formik.setFieldValue('password', value)}
            />
            {renderPassIcon()}
          </View>

          <View style={styles.divider}/>
          <Button onPress={() => formik.handleSubmit()} disabled={!formik.isValid} title="Iniciar Sesion!"/>
          <View style={styles.linksContainer}>
            <Link link="Me olvide la contraseña" onPress={() => console.log("Me olvide la contraseña")}/>
            <View style={styles.divider}/>
            <Link link="Registrarse!" onPress={handleGoToRegister}/>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: materialColors.schemes.light.primary,
  },
  logo: {
    left: sizes.defaultMargin.horizontal,
    color: materialColors.palettes.neutral[100],
    fontSize: 80,
    fontWeight: 'bold'
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: sizes.defaultPadding.horizontal,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  titulo: {
    fontSize: 24,
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
  },
  linksContainer: {
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})