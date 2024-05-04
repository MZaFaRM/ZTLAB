import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import 'react-native-gesture-handler';

// Pages and components
import SideBar from './Sidebar';
import {pages} from '../constants/constants';
import AssignmentsPage from './Assignments';
import Homepage from './HomePage';
import AlertsPage from './Alerts';
import SubjectWiseAttendance from './SubjectWiseAttendance';
import SurveyPage from './Survey';
import AttendanceTable from './AttendanceTable';

const Drawer = createDrawerNavigator();

export const CustomDrawer = ({navigation}) => {
  return (
    <Drawer.Navigator
      initialRouteName={pages.home}
      drawerContent={props => <SideBar {...props} />}>
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
        name={pages.alerts}
        component={AlertsPage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={pages.subjectWiseAttendance}
        component={SubjectWiseAttendance}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={pages.surveyPage}
        component={SurveyPage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={pages.attendanceTable}
        component={AttendanceTable}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
