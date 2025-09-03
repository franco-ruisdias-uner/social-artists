import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import Link from "../../components/Link";
import Button from "../../components/Button";
import {sizes} from "../../utils";
import {materialColors} from "../../utils/colors";
import {useForm, Controller,} from "react-hook-form"

interface IProps {
  onLoginClicked: () => void
}

interface IFormValues {
  nombre: string
  apellido: string
  email: string
  pass: string
}
const regex = /.*@.*/gm;

export default function RegisterHooks(props: IProps) {
  const {onLoginClicked} = props
  const [showPass, setShowPass] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      pass: ''
    },

  })
  const handleRegister = (values: IFormValues) => {
    console.log(values)
  }

  return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Registrarse!</Text>
        <Controller control={control}
                    rules={{
                      required: true
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={[styles.input, errors?.nombre && styles.inputError]}
                            placeholder="Nombre"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                        />
                    )} name={'nombre'}/>
        {errors.nombre && <Text style={styles.error}>{errors.nombre?.message}</Text>}
        <Controller control={control} render={({field: {onChange, onBlur, value}}) => (
            <TextInput
                style={[styles.input, errors?.nombre && styles.inputError]}
                placeholder="Apellido"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
            />
        )} name={'apellido'}/>
        {errors.apellido && <Text style={styles.error}>{errors.apellido?.message}</Text>}
        <Controller control={control}
                    render={({field: {onChange, onBlur, value}}) => (
            <TextInput
                keyboardType={"email-address"}
                style={[styles.input, errors?.nombre && styles.inputError]}
                placeholder="email"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
            />
        )} name={'email'}/>
        {errors.email && <Text style={styles.error}>{errors.email?.message}</Text>}
        <View style={styles.passContainer}>
          <Controller control={control} render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                  secureTextEntry={!showPass}
                  style={[styles.input, errors?.nombre && styles.inputError]}
                  placeholder="Contraseña"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
              />
          )} name={'pass'}/>
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Text>{showPass ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
        {errors.pass && <Text style={styles.error}>{errors.pass?.message}</Text>}
        <View style={styles.divider}/>
        <Button onPress={handleSubmit(handleRegister)} disabled={!isValid} title="Registrarse!"/>
        <View style={styles.divider}/>
        <Link link="Volver al login!" onPress={onLoginClicked}/>
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