import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/providers/AuthProvider';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#f2058b'} />
      <AuthProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}
