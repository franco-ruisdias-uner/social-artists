import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView, ActivityIndicator,
  Alert
} from "react-native";
import {useEffect, useState} from "react";
import Link from "@components/Link";
import Button from "@components/Button";
import {sizes} from "@utils/sizes";
import {materialColors} from "@utils/colors";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StackActions, useNavigation, useRoute} from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from "axios";
import axiosClient from "../../../core/api";
import {IUser} from "@shared/models";

interface IFormValues {
  nombre: string
  apellido: string
  email: string
  password: string
}

const FormValidationSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  apellido: Yup.string().required('Apellido es requerido'),
  email: Yup.string().email('Email no tiene la forma adecuada').required('Email es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida')
})
export default function Register() {
  const navigation = useNavigation()
  const route = useRoute()
  const [showPass, setShowPass] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string | undefined>(undefined)

  const handleRegister = (values: IFormValues) => {

    setIsLoading(true)
    axiosClient.post<IUser>('/auth/register', values)
        .then(result => {
          console.log(result.data)
          Alert.alert("Registro exitoso", "", [
            {
              style: 'default',
              text: 'Ir al login',
              onPress: () => navigation.goBack()
            }])
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    console.log(values)
  }

  useEffect(() => {
    console.log(route.params)
  }, [route]);


  return (
      <Formik initialValues={{nombre: '', apellido: '', email: '', password: ''}}
              validationSchema={FormValidationSchema}
              onSubmit={handleRegister}>
        {({values, handleChange, handleSubmit, errors, isValid}) => (
            <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                  style={styles.container}>
              <ScrollView contentContainerStyle={styles.innerContainer}>
                <Text style={styles.titulo}>Registrarse!</Text>
                <TextInput
                    editable={!isLoading}
                    style={[styles.input, errors?.nombre && styles.inputError]}
                    placeholder="Nombre"
                    value={values.nombre}
                    onChangeText={handleChange('nombre')}
                />
                {errors && <Text style={styles.error}>{errors.nombre}</Text>}
                <TextInput
                    editable={!isLoading}
                    style={[styles.input, errors?.apellido && styles.inputError]}
                    placeholder="Apellido"
                    value={values.apellido}
                    onChangeText={handleChange('apellido')}
                />
                {errors && <Text style={styles.error}>{errors.apellido}</Text>}
                <TextInput
                    autoCapitalize={"none"}
                    editable={!isLoading}
                    keyboardType={"email-address"}
                    style={[styles.input, errors?.email && styles.inputError]}
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                />
                {errors && <Text style={styles.error}>{errors.email}</Text>}
                <View style={[styles.passContainer, errors?.pass && styles.inputError]}>
                  <TextInput
                      editable={!isLoading}
                      secureTextEntry={!showPass}
                      placeholder="Contraseña"
                      value={values.password}
                      onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity onPress={() => setShowPass(!showPass)} disabled={isLoading}>
                    <MaterialIcons name={showPass ? "visibility-off" : "visibility"} size={24}
                                   color={isLoading ? "grey" : "black"}/>
                  </TouchableOpacity>
                </View>
                {errors && <Text style={styles.error}>{errors.pass}</Text>}
                <View style={styles.divider}/>
                {
                    apiError &&
                  <Text style={styles.error}>{apiError}</Text>
                }
                {
                    isLoading &&
                  <ActivityIndicator/>
                }
                <Button onPress={handleSubmit} disabled={!isValid || isLoading} title="Registrarse!"/>
                <View style={styles.divider}/>
                <Link link="Volver al login!" onPress={() => navigation.goBack()}/>
              </ScrollView>
            </KeyboardAvoidingView>
        )}
      </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    borderBottomColor: materialColors.schemes.light.outlineVariant,
    borderBottomWidth: 1,
    minWidth: 300,
  },
  input: {
    height: 50,
    marginTop: 16,
    borderBottomColor: materialColors.schemes.light.outlineVariant,
    borderBottomWidth: 1,
    minWidth: 300,
  },
  inputError: {
    borderBottomColor: materialColors.schemes.light.error,
  },
  divider: {
    height: 16
  },
  error: {
    color: materialColors.schemes.light.error,
    fontSize: 10
  }
})