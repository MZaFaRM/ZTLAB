import {React, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {getSubjectWiseAttendance} from '../api/info';
import {SubjectBox} from '../components/assignments/attendance/subjectBox';
import Layout from '../components/layout/layout';
import {Colors, Fonts, pages} from '../constants/constants';
import Icon from '../components/icons';
import AppStyles from '../constants/styles';

const SubjectWiseAttendance = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [AttendanceData, setAttendanceData] = useState({});
  const [AttendancePercentage, setAttendancePercentage] = useState(0);
  const [DutyLeaves, setDutyLeaves] = useState(0);

  const calculateAttendancePercentage = attendanceData => {
    const totalAttendance = attendanceData.reduce(
      (acc, subject) => acc + subject.total_attendance,
      0,
    );
    return Math.round(totalAttendance / attendanceData.length);
  };

  const calculateDutyLeavesPercentage = attendanceData => {
    const totalDutyLeaves = attendanceData.reduce(
      (acc, subject) => acc + subject.duty_leaves,
      0,
    );
    const totalClasses = attendanceData.reduce(
      (acc, subject) => acc + subject.total_classes,
      0,
    );
    return Math.round((totalDutyLeaves / totalClasses) * 100);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubjectWiseAttendance();
        setAttendanceData(data.data);

        const attendancePercentage = calculateAttendancePercentage(data.data);
        setAttendancePercentage(attendancePercentage);

        const dutyLeavesPercentage = calculateDutyLeavesPercentage(data.data);
        setDutyLeaves(dutyLeavesPercentage);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout navigation={navigation} currentPage={pages.home}>
      <ScrollView
        contentContainerStyle={styles.Homepage}
        showsVerticalScrollIndicator={false}>
        <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
          Attendance
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.Blue} />
        ) : (
          <>
            <View style={styles.attendance}>
              <View style={styles.total}>
                <Text style={Fonts.Body}>Total Att.</Text>
                <Text style={[Fonts.Heading2, styles.Score]}>
                  {AttendancePercentage}%
                </Text>
              </View>
              <View style={styles.duty}>
                <Text style={Fonts.Body}>Duty Leave</Text>
                <Text style={[Fonts.Heading2, styles.Score]}>
                  {DutyLeaves}%
                </Text>
              </View>
              <View style={styles.Analysis}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://kmctce.etlab.app/ktuacademics/student/attendance`,
                    )
                  }
                  style={[AppStyles.BlueButton, AppStyles.CustomButton]}>
                  <Icon
                    type="FontAwesome5"
                    name="external-link-alt"
                    size={15}
                    color={Colors.Blue}
                  />
                  <Text
                    style={[Fonts.Body, AppStyles.BlueText, {marginLeft: 10}]}>
                    Visit Website
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
  attendance: {
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  Score: {
    fontSize: 30,
    color: Colors.Blue,
  },
  total: {
    flex: 1,
    alignItems: 'flex-start',
  },
  duty: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default SubjectWiseAttendance;

{
  /* <Calendar
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
            /> */
}
