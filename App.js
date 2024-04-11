import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';

// Pages and components
import { pages } from './src/constants/constants';
import { CustomDrawer } from './src/pages/Drawer';
import LoginPage from './src/pages/LoginPage';

const Stack = createStackNavigator();

export default function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#FFFFFF');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={pages.main}
            component={CustomDrawer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={pages.login}
            component={LoginPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
