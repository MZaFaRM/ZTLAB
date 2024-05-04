import AsyncStorage from '@react-native-async-storage/async-storage';
import {React, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {CustomEtlabWebView} from '../components/customWebView';
import Layout from '../components/layout/layout';
import {pages} from '../constants/constants';
import Minesweeper from './Minesweeper';

const AttendanceTable = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'));
        setUserData({
          username: userData.username,
          password: userData.password,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout navigation={navigation} currentPage={pages.attendanceTable}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Minesweeper />
        ) : (
          <View style={{backgroundColor: 'black', height: 1000}}>
            <CustomEtlabWebView
              source={{
                uri: 'https://kmctce.etlab.app/ktuacademics/student/attendance',
              }}
              username={userData.username}
              password={userData.password}            />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default AttendanceTable;
