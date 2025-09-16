import {Pressable, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TAB_ROUTES} from "@utils/constants";
import {HomeScreen, MyNetworkScreen} from "./screens";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useContext} from "react";
import {AUTH_ACTIONS, AuthContext} from "@shared/context/AuthContext";


const Tab = createBottomTabNavigator();

export default function TabsScreen() {

  const {dispatch} = useContext(AuthContext)
  const handleLogout = () => {
    console.log('logout')
    dispatch({type: AUTH_ACTIONS.LOGOUT})
  }

  return (
      <Tab.Navigator screenOptions={{
        headerRight: ({tintColor}) => (
            <TouchableOpacity onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color={tintColor}/>
            </TouchableOpacity>
        )
      }}>
        <Tab.Screen name={TAB_ROUTES.HOME} component={HomeScreen}
                    options={{
                      title: "Home",
                    }}
        />
        <Tab.Screen name={TAB_ROUTES.MY_NETWORK} component={MyNetworkScreen} options={{
          title: "My Network",
        }}/>
      </Tab.Navigator>
  )
}