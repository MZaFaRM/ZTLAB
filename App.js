import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawerContent from './pages/sidebar';

// Import your screens
import Homepage from './pages/homepage';
import Loginpage from './pages/loginpage';
import {updateHeaders} from './api/src';

// Additional imports for gesture handler
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer screens
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      >
      <Drawer.Screen
        name="Home"
        component={Homepage}
        options={{headerShown: false}}
      />
      {/* Add more screens to the drawer as needed */}
    </Drawer.Navigator>
  );
}

export default function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#FFFFFF'); // Light color, such as white
  // updateHeaders('session_id', '0f4eb699-0073-490d-a8d8-fa15286b1200');

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Loginpage} options={{headerShown: false}} />
          {/* Replace the direct call to Homepage with MyDrawer */}
          <Stack.Screen
            name="Main"
            component={MyDrawer}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
