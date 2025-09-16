import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AUTH_ROUTES} from "../../utils/constants";
import {Login, Register} from "./screens";
import {SafeAreaView} from "react-native-safe-area-context";

const Stack = createNativeStackNavigator()


export default function AuthStackScreen() {


  return (
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator initialRouteName={AUTH_ROUTES.LOGIN} screenOptions={{headerShown: false}}>
          <Stack.Screen name={AUTH_ROUTES.LOGIN} component={Login}
                        options={{
                          title: 'Iniciar Sesión'
                        }}
          />
          <Stack.Screen name={AUTH_ROUTES.REGISTER} component={Register}
                        options={{
                          title: 'Registro',
                          headerBackVisible: false,
                          headerBackTitle: 'Volver'
                        }}
          />
        </Stack.Navigator>
      </SafeAreaView>
  )
}