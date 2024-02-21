import {React} from 'react';
import {StatusBar, View} from 'react-native';

import Homepage from './pages/homepage';
import Loginpage from './pages/loginpage';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';


export default function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#FFFFFF'); // Light color, such as white
  const Stack = createStackNavigator();

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Loginpage}  options={{ headerShown: false }}  />
          <Stack.Screen name="Home" component={Homepage}  options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );  
}
