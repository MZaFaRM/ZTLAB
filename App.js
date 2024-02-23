import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawerContent from './pages/sidebar';

// Import your screens
import Homepage from './pages/homepage';
import Loginpage from './pages/loginpage';
import AssignmentsPage from './pages/assignments';

import {pages} from './constants/pages';

import {updateHeaders} from './api/src';

// Additional imports for gesture handler
import 'react-native-gesture-handler';
import Layout from './components/layout/layout';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer screens
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={pages.home}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={pages.home}
        component={Homepage}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name={pages.assignments}
        component={AssignmentsPage}
        options={{headerShown: true}}
      />
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
          <Stack.Screen
            name={pages.login}
            component={Loginpage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={pages.main}
            component={MyDrawer}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
