import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import AppStyles from '../../styles';
import Icon from '../icons';
import fetchAndUpdateTimetable from '../../src/helpers/TimeTable';



export default function TimeTable() {
  const [currentDay, setCurrentDay] = useState();
  const [period, setPeriod] = useState({});

  const dayLabels = ['', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const updateTimetableData = async () => {
      try {
        const {currentDay, currentPeriod} =
          await fetchAndUpdateTimetable();
        setCurrentDay(currentDay);
        setPeriod(currentPeriod);
      } catch (error) {
        console.error('Error updating timetable data:', error);
      }
    };

    updateTimetableData();

    const intervalId = setInterval(updateTimetableData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const getDayStyle = dayNumber => {
    return dayNumber === currentDay
      ? [styles.SelectedDay, styles.SelectedDayText]
      : [];
  };

  return (
    <View style={[styles.TimeTable, AppStyles.Box]}>
      <View style={styles.Days}>
        {[1, 2, 3, 4, 5, 6].map(dayNumber => (
          <View
            key={dayNumber}
            style={[
              AppStyles.BlueButton,
              styles.Circle,
              ...getDayStyle(dayNumber),
            ]}>
            <Text
              style={[
                Fonts.Body,
                AppStyles.BlueText,
                styles.DayText,
                ...getDayStyle(dayNumber),
              ]}>
              {dayLabels[dayNumber]}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.Period}>
        <Icon
          type="FontAwesome6"
          name="caret-left"
          size={15}
          color={Colors.Blue}
          style={styles.PeriodCaret}
        />
        <View>
          <View style={styles.PeriodNumber}>
            <Text style={[Fonts.Body, {color: Colors.Grey}]}>
              Period {period.roman}
            </Text>
          </View>
          <View style={styles.PeriodName}>
            <Text style={[Fonts.Heading1, styles.subjectName]}>
              {period.subject_name || 'No Class Scheduled'}
            </Text>
            <Text style={[Fonts.Body, {color: Colors.Grey}]}>
              {period.professor || 'Unknown'} {period.subject_type}
            </Text>
          </View>
        </View>
        <Icon
          type="FontAwesome6"
          name="caret-right"
          size={15}
          color={Colors.Blue}
          style={styles.PeriodCaret}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Circle: {
    borderRadius: 50,
    aspectRatio: 1,
    width: 40,
    margin: 10,
  },
  TimeTable: {
    alignItems: 'center',
  },
  Days: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  DayText: {
    fontSize: 18,
  },
  SelectedDay: {
    backgroundColor: Colors.Blue,
  },
  SelectedDayText: {
    color: Colors.White,
  },
  Period: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PeriodNumber: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    marginTop: 15,
    borderBottomColor: Colors.LightGrey,
  },
  subjectName: {
    color: Colors.DarkGrey,
    fontSize: 16,
    textAlign: 'center',
  },
  PeriodName: {
    width: 250,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfessorName: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  PeriodCaret: {
    margin: 20,
  },
});
