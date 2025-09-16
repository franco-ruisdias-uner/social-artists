import AuthStackScreen from "./auth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROOT_ROUTES} from "@utils/constants";
import {useContext, useEffect, useState} from "react";
import TabsScreen from "./tabs";
import {SafeAreaView} from "react-native-safe-area-context";
import {AUTH_ACTIONS, AuthContext} from "@shared/context/AuthContext";
import {getUser} from "@utils/secure-store";
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";

const Stack = createNativeStackNavigator()

export default function Root() {
  const {state, dispatch} = useContext(AuthContext)

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  useEffect(() => {
    if (state?.user) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [state]);


  useEffect(() => {
    getUser().then(user => {
      if (user) {
        dispatch({type: AUTH_ACTIONS.SET_USER, payload: {user}})
        setIsSignedIn(true)
        SplashScreen.hideAsync();
      }
    })
  }, []);
  return (
      <View style={{flex: 1}}>
        <Stack.Navigator
            initialRouteName={isSignedIn ? ROOT_ROUTES.TABS : ROOT_ROUTES.AUTH} screenOptions={{headerShown: false}}>
          {
            isSignedIn ?
                <Stack.Screen name={ROOT_ROUTES.TABS} component={TabsScreen}/>
                :
                <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthStackScreen}/>
          }
        </Stack.Navigator>
      </View>
  )
}