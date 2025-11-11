import AuthStackScreen from "./auth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MODAL_ROUTES, ROOT_ROUTES} from "@utils/constants";
import {useContext, useEffect, useState} from "react";
import TabsScreen from "./tabs";
import {AUTH_ACTIONS, AuthContext} from "@shared/context/AuthContext";
import {getUser} from "@utils/secure-store";
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";
import CreatePostModal from "@app/create-post";
import {requestNotificationPermission} from "@shared/helpers/schedule-notification";
import * as Notifications from 'expo-notifications';
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator()

export default function Root() {
  const {state, dispatch} = useContext(AuthContext)
  const navigation = useNavigation();
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
      }
      SplashScreen.hideAsync();
    })

    requestNotificationPermission().catch((error) => {
      console.error('Error requesting notification permissions:', error);
    });
  }, []);

  useEffect(() => {
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      try {
        const data = response.notification.request.content.data as any;
        const routeName = data?.navigateTo;
        const params = data?.params;
        // cancelAllNotifications();
        if (routeName) {
          // @ts-ignore
          navigation.navigate(routeName as never, params as never);
        }
      } catch (e) {
        console.warn('Error manejando la respuesta de notificación:', e);
      }
    });



    return () => {
      responseSubscription.remove()
    };
  }, [navigation])

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
          <Stack.Group screenOptions={{presentation: "modal"}}>
            <Stack.Screen name={MODAL_ROUTES.CREATE_POST} component={CreatePostModal}/>
          </Stack.Group>
        </Stack.Navigator>
      </View>
  )
}