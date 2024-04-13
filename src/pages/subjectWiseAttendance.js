import {React, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {getSubjectWiseAttendance} from '../api/info';
import {SubjectBox} from '../components/assignments/attendance/subjectBox';
import Layout from '../components/layout/layout';
import {Colors, Fonts, pages} from '../constants/constants';
import OverallAttendance from '../components/homepage/attendance';
import {Calendar} from 'react-native-calendars';

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
          <>
            {/* <Calendar
              // Customize the appearance of the calendar
              style={styles.calendar}
              // Specify the current date
              current={'2012-03-01'}
              // Callback that gets called when the user selects a day
              onDayPress={day => {
                console.log('selected day', day);
              }}
              // Mark specific dates as marked
              markedDates={{
                '2012-03-01': {
                  selected: true,
                  marked: true,
                  selectedColor: '#2C7865',
                },
                '2012-03-02': {
                  selected: true,
                  marked: true,
                  selectedColor: '#FF9800',
                },
                '2012-03-03': {
                  selected: true,
                  marked: true,
                  dots: [
                    {color: 'blue',},
                    {color: 'blue'},
                  ],
                  selectedColor: 'red',
                },
                '2012-03-04': {
                  selected: true,
                  marked: true,
                  selectedColor: '#496989',
                },
                '2012-03-05': {
                  selected: true,
                  marked: true,
                  selectedColor: 'blue',
                },
              }}
            /> */}

            {AttendanceData.map(subject => (
              <SubjectBox
                key={subject.name}
                SubjectTitle={subject.name}
                AttendancePercentage={subject.total_attendance}
                DutyLeaves={subject.duty_leaves}
                DutyLeavePercentage={subject.duty_leave_percentage}
                TotalClasses={subject.total_classes}
                PresentClasses={subject.present_classes}
              />
            ))}
          </>
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
  calendar: {
    borderWidth: 2,
    borderColor: Colors.LightGrey,
    height: 350,
    borderRadius: 10,
  },
});

export default SubjectWiseAttendance;
