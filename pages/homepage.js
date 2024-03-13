import {React, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {getUserInfo} from '../api/info';
import Attendance from '../components/homepage/attendance';
import Menu from '../components/homepage/menu';
import TimeTable from '../components/homepage/timeTable';
import Icon from '../components/icons';
import Layout from '../components/layout/layout';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';
import AppStyles from '../styles';
import {pages} from '../constants/pages';

import {handleUnauthorizedAccess} from '../api/auth';

export default function Homepage({navigation}) {
  const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [attendance, setAttendance] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUserInfo();
        const userData = response.data;

        setUsername(userData.name);
        setDepartment(userData.department);
        setYear(userData.year);
        setRollNumber(userData.roll_number);
        setAttendance(userData.attendance);
      } catch (error) {
        console.error('Error fetching user info:', error);
        handleUnauthorizedAccess(error, navigation);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Layout navigation={navigation} currentPage={pages.home}>
          <ScrollView
            contentContainerStyle={styles.Homepage}
            showsVerticalScrollIndicator={false}>
            <View style={styles.Profile}>
              <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
                {username}
              </Text>
              <Text style={[Fonts.Body]}>
                {department} {year}
              </Text>
              <Text style={[Fonts.Body]}>
                Roll No :
                <Text style={[Fonts.Body, {color: Colors.DarkGrey}]}>
                  {' '}
                  {rollNumber}
                </Text>
              </Text>
            </View>
            <View style={styles.Marks}>
              <View style={styles.CGPA}>
                <Text style={Fonts.Body}>CGPA</Text>
                <Text style={[Fonts.Heading2, styles.Score]}>9.12</Text>
              </View>
              <View style={styles.PrevCGPA}>
                <Text style={Fonts.Body}>Prev - CGPA</Text>
                <Text style={[Fonts.Heading2, styles.Score]}>9.57</Text>
              </View>
              <View style={styles.Analysis}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[AppStyles.BlueButton, AppStyles.CustomButton]}>
                  <Icon
                    type="Entypo"
                    name="bar-graph"
                    size={15}
                    color={Colors.Blue}
                  />
                  <Text
                    style={[Fonts.Body, AppStyles.BlueText, {marginLeft: 10}]}>
                    Analysis
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TimeTable />
            <Attendance attendance={attendance} />
            <Menu />
          </ScrollView>
        </Layout>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Homepage: {
    padding: 25,
    paddingTop: 15,
  },
  Profile: {},
  Marks: {
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  Score: {
    fontSize: 30,
    color: Colors.Blue,
  },
  CGPA: {
    flex: 1,
    alignItems: 'flex-start',
  },
  PrevCGPA: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
