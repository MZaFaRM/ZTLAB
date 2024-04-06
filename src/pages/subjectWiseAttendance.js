import {React, useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import Layout from '../components/layout/layout';
import {Colors} from '../constants/constants';
import {Fonts} from '../constants/constants';
import {pages} from '../constants/constants';
import {getSubjectWiseAttendance} from '../api/info';
import {SubjectBox} from '../components/assignments/attendance/subjectBox';
import {handleUnauthorizedAccess} from '../api/auth';

const SubjectWiseAttendance = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [AttendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    getSubjectWiseAttendance()
      .then(data => {
        setAttendanceData(data.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout navigation={navigation} currentPage={pages.home}>
      <ScrollView
        contentContainerStyle={styles.Homepage}
        showsVerticalScrollIndicator={false}>
        <Text
          style={[Fonts.Heading1, {color: Colors.DarkGrey, marginBottom: 30}]}>
          Attendance
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.Blue} />
        ) : (
          AttendanceData.map(subject => (
            <SubjectBox
              key={subject.name}
              SubjectTitle={subject.name}
              AttendancePercentage={subject.total_attendance}
              DutyLeaves={subject.duty_leaves}
              DutyLeavePercentage={subject.duty_leave_percentage}
              TotalClasses={subject.total_classes}
              PresentClasses={subject.present_classes}
            />
          ))
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
});

export default SubjectWiseAttendance;
