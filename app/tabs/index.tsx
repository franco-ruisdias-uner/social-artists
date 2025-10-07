import {Pressable} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TAB_ROUTES} from "@utils/constants";
import {PlacesScreen, PostsScreen} from "./screens";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useContext} from "react";
import {AUTH_ACTIONS, AuthContext} from "@shared/context/AuthContext";
import {materialColors} from "@utils/colors";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function TabsScreen() {

  const {dispatch} = useContext(AuthContext)
  const handleLogout = () => {
    dispatch({type: AUTH_ACTIONS.LOGOUT})
  }

  return (
      <Tab.Navigator screenOptions={{
        headerTitleStyle: {color: materialColors.schemes.light.onPrimaryContainer},
        headerStyle: {backgroundColor: materialColors.schemes.light.surfaceContainer},
        tabBarStyle: {backgroundColor: materialColors.schemes.light.surfaceContainer},
        tabBarActiveTintColor: materialColors.schemes.light.onPrimaryContainer,
        headerRight: () => (
            <Pressable onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color={materialColors.schemes.light.onPrimaryContainer}/>
            </Pressable>
        )
      }}>
        <Tab.Screen name={TAB_ROUTES.POSTS} component={PostsScreen}
                    options={{
                      title: "Posts",
                      tabBarIcon: ({color, size}) => (
                          <FontAwesome5 name="home" size={size} color={color}/>
                      )
                    }}
        />
        <Tab.Screen name={TAB_ROUTES.MY_NETWORK} component={PlacesScreen} options={{
          title: "Lugares",
          headerShown: false,
          tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="map-marker-alt" size={size} color={color}/>
          )
        }}/>
      </Tab.Navigator>
  )
}