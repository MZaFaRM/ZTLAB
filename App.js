import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import {getAuthToken, storeAuthToken} from './services/AuthService';
import {updateHeaders} from './api/src';

// Pages and components
import CustomDrawerContent from './pages/sidebar';
import Homepage from './pages/homepage';
import Loginpage from './pages/loginpage';
import AssignmentsPage from './pages/assignments';
import SubjectWiseAttendance from './pages/subjectWiseAttendance';
import {pages} from './constants/pages';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={pages.home}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={pages.home}
        component={Homepage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={pages.assignments}
        component={AssignmentsPage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={pages.subjectWiseAttendance}
        component={SubjectWiseAttendance}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

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
            component={MyDrawer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={pages.login}
            component={Loginpage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
