import AuthStackScreen from "./auth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROOT_ROUTES} from "../utils/constants";
import {useState} from "react";
import TabsScreen from "./tabs";

const Stack = createNativeStackNavigator()

export default function Root() {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(true)

  return (
      <Stack.Navigator initialRouteName={isSignedIn ? ROOT_ROUTES.TABS : ROOT_ROUTES.AUTH}>
        {
          isSignedIn ?
              <Stack.Screen name={ROOT_ROUTES.TABS} component={TabsScreen} options={{headerShown: false}}/>
              :
              <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthStackScreen}/>
        }
      </Stack.Navigator>

  )
}