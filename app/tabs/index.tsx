import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TAB_ROUTES} from "../../utils/constants";
import {HomeScreen, MyNetworkScreen} from "./screens";

const Tab = createBottomTabNavigator();

export default function TabsScreen() {

  return (
      <Tab.Navigator>
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