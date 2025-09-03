import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {useState} from "react";
import Link from "../../components/Link";
import Button from "../../components/Button";
import {sizes} from "../../utils";
import {materialColors} from "../../utils/colors";
import {Formik} from 'formik';
import * as Yup from 'yup';

interface IProps {
  onLoginClicked: () => void
}

interface IFormValues {
  nombre: string
  apellido: string
  email: string
  pass: string
}

const FormValidationSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  apellido: Yup.string().required('Apellido es requerido'),
  email: Yup.string().email('Email no tiene la forma adecuada').required('Email es requerido'),
  pass: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida')
})
export default function Register(props: IProps) {
  const {onLoginClicked} = props
  const [showPass, setShowPass] = useState<boolean>(false)

  const handleRegister = (values: IFormValues) => {
    console.log(values)
  }

  return (
      <Formik initialValues={{nombre: '', apellido: '', email: '', pass: ''}}
              validationSchema={FormValidationSchema}
              validateOnMount={true}
              onSubmit={handleRegister}>
        {({values, handleChange, handleSubmit, errors, isValid}) => (
            <View style={styles.container}>
              <Text style={styles.titulo}>Registrarse!</Text>
              <TextInput
                  style={[styles.input, errors?.nombre && styles.inputError]}
                  placeholder="Nombre"
                  value={values.nombre}
                  onChangeText={handleChange('nombre')}
              />
              {errors && <Text style={styles.error}>{errors.nombre}</Text>}
              <TextInput
                  style={[styles.input, errors?.apellido && styles.inputError]}
                  placeholder="Apellido"
                  value={values.apellido}
                  onChangeText={handleChange('apellido')}
              />
              {errors && <Text style={styles.error}>{errors.apellido}</Text>}
              <TextInput
                  keyboardType={"email-address"}
                  style={[styles.input, errors?.email && styles.inputError]}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
              />
              {errors && <Text style={styles.error}>{errors.email}</Text>}
              <View style={styles.passContainer}>
                <TextInput
                    secureTextEntry={!showPass}
                    style={[styles.input, errors?.pass && styles.inputError]}
                    placeholder="Contraseña"
                    value={values.pass}
                    onChangeText={handleChange('pass')}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <Text>{showPass ? 'Ocultar' : 'Mostrar'}</Text>
                </TouchableOpacity>
              </View>
              {errors && <Text style={styles.error}>{errors.pass}</Text>}
              <View style={styles.divider}/>
              <Button onPress={handleSubmit} disabled={!isValid} title="Registrarse!"/>
              <View style={styles.divider}/>
              <Link link="Volver al login!" onPress={onLoginClicked}/>
            </View>
        )}
      </Formik>
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
    color: 'black',
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