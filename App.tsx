import {SafeAreaProvider} from 'react-native-safe-area-context';
import Auth from "./app/auth";

export default function App() {
  return (
      <SafeAreaProvider>
        <Auth/>
      </SafeAreaProvider>
  );
}