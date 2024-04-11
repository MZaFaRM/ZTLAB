import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';


// Pages and components
import { pages } from './src/constants/constants';
import AssignmentsPage from './src/pages/assignments';
import Homepage from './src/pages/HomePage';
import CustomDrawerContent from './src/pages/sidebar';
import SubjectWiseAttendance from './src/pages/subjectWiseAttendance';
import LoginPage from './src/pages/LoginPage';

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
            component={LoginPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}