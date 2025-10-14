import {NavigationContainer} from "@react-navigation/native";
import Root from "./app/root";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {AuthProvider} from "./shared/context/AuthContext";
import * as SplashScreen from 'expo-splash-screen';
import {KeyboardProvider} from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
export default function App() {

  return (
      <KeyboardProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthProvider>
              <Root/>
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </KeyboardProvider>
  );
}