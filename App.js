import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler'; // Import at the top

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

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(pages.login);
  const [component, setComponent] = useState(useCallback(() => Loginpage, []));

  useEffect(() => {
    async function initializeApp() {
      try {
        const token = await getAuthToken();
        if (token) {
          updateHeaders('session_id', token);
          setName(pages.main);
          setComponent(() => MyDrawer);
        }
      } catch (err) {
        console.log('Error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={name}
            component={component}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={name === pages.main ? pages.login : pages.main}
            component={component === MyDrawer ? Loginpage : MyDrawer}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
