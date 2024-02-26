import {React, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import {ProgressBar} from '../components/homepage/components/progressbar';
import {getSubjectWiseAttendance} from '../api/info';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SubjectWiseAttendance = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getSubjectWiseAttendance()
      .then(data => {
        console.log(data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <Layout navigation={navigation} currentPage={pages.home}>
      <ScrollView
        contentContainerStyle={styles.Homepage}
        showsVerticalScrollIndicator={false}>
        <Text
          style={[Fonts.Heading1, {color: Colors.DarkGrey, marginBottom: 20}]}>
          Attendance
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.Blue} />
        ) : (
          <View style={[styles.SubjectBox]}>
            <View style={styles.SubjectHeadingBox}>
              <Text
                style={[
                  Fonts.Body,
                  {color: Colors.DarkGrey, fontWeight: 'normal'},
                ]}>
                IIT402 - Information Technology and Science of Sociology
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Icon
                  type="FontAwesome6"
                  name="caret-right"
                  size={18}
                  color={Colors.Blue}
                  style={styles.SubjectMoreInfoCaret}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.SubjectBodyBox}>
              <View style={[AppStyles.FlexBox, {marginVertical: 10}]}>
                <View style={[AppStyles.FlexLeft]}>
                  <View style={[{flexDirection: 'row'}]}>
                    <Icon
                      type="FontAwesome5"
                      name="users"
                      size={16}
                      color={Colors.DarkGrey}
                      style={styles.SubjectBodyIcon}
                    />
                    <Text style={[Fonts.Button]}>Attendance</Text>
                  </View>
                  <Text style={[Fonts.Heading1, styles.Score]}>60%</Text>
                </View>
                <View style={[AppStyles.FlexLeft, styles.DutyLeaveBox]}>
                  <View style={[{flexDirection: 'row'}]}>
                    <Icon
                      type="FontAwesome6"
                      name="user-gear"
                      size={16}
                      color={Colors.DarkGrey}
                      style={styles.SubjectBodyIcon}
                    />
                    <Text style={[Fonts.Button]}>Duty Leave</Text>
                  </View>
                  <Text
                    style={[
                      Fonts.Heading2,
                      styles.Score,
                      {color: Colors.Grey},
                    ]}>
                    6
                    <Text
                      style={[
                        Fonts.Heading2,
                        styles.Score,
                        {color: Colors.Grey, fontSize: 15},
                      ]}>
                      {' '}
                      3%
                    </Text>
                  </Text>
                </View>
                <View style={[AppStyles.FlexLeft, styles.LeaveQuotaBox]}>
                  <View style={[{flexDirection: 'row'}]}>
                    <Icon
                      type="FontAwesome6"
                      name="chart-pie"
                      size={16}
                      color={Colors.DarkGrey}
                      style={styles.SubjectBodyIcon}
                    />
                    <Text style={[Fonts.Button]}>Leave Quota</Text>
                  </View>
                  <Text
                    style={[
                      Fonts.Heading2,
                      styles.Score,
                      {color: Colors.Blue, fontSize: 15},
                    ]}>
                    75%
                    <Text
                      style={[
                        Fonts.Heading2,
                        styles.Score,
                        {color: Colors.Green},
                      ]}>
                      +3
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={{marginBottom: 10, alignItems: 'center'}}>
                <Text style={Fonts.Body}>
                  Total classes:{' '}
                  <Text style={{fontWeight: 'bold'}}>10 / 36</Text>
                </Text>
              </View>
              <ProgressBar progress={60} />
            </View>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  Homepage: {
    padding: 25,
    paddingTop: 15,
  },
  Score: {
    fontSize: 45,
    color: Colors.Green,
    fontWeight: 'bold',
  },
  SubjectBox: {
    borderWidth: 2,
    borderColor: Colors.LightGrey,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  SubjectHeadingBox: {
    backgroundColor: Colors.LightBlue,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LightGrey,
    flexDirection: 'row',

    alignItems: 'center',
  },
  SubjectBodyBox: {
    padding: 10,
  },
  DutyLeaveBox: {
    alignItems: 'center',
  },
  LeaveQuotaBox: {
    alignItems: 'flex-end',
  },
  SubjectMoreInfoCaret: {
    marginLeft: 20,
  },
  SubjectBodyIcon: {
    marginRight: 5,
  },
});

export default SubjectWiseAttendance;
