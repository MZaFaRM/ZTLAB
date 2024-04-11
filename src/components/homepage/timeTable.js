import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/constants';
import {Fonts} from '../../constants/constants';
import AppStyles from '../../constants/styles';
import Icon from '../icons';
import fetchAndUpdateTimetable from '../../helpers/TimeTable';

export default function TimeTable() {
  const [currentDay, setCurrentDay] = useState();
  const [period, setPeriod] = useState({});
  const [periodIndex, setPeriodIndex] = useState(-1);

  const dayLabels = ['', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleTimeTableNavigation = direction => {
    setPeriodIndex(prevIndex => {
      if (direction === 'left') {
        return prevIndex === 0 ? 7 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % 8;
      }
    });
  };

  const updateTimetableData = async () => {
    try {
      const day = new Date();
      const {currentDay, currentPeriod} = await fetchAndUpdateTimetable(
        day,
        periodIndex,
      );
      setCurrentDay(currentDay);
      setPeriod(currentPeriod);
    } catch (error) {
      console.error('Error updating timetable data:', error);
    }
  };

  useEffect(() => {
    updateTimetableData();
    const intervalId = setInterval(updateTimetableData, 60000);
    return () => clearInterval(intervalId);
  }, [periodIndex]);

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
        <TouchableOpacity onPress={() => handleTimeTableNavigation('left')}>
          <Icon
            type="FontAwesome6"
            name="caret-left"
            size={15}
            color={Colors.Blue}
            style={styles.PeriodCaret}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.PeriodNumber}>
            <Text style={[Fonts.Body, {color: Colors.Grey}]}>
              Period {period.roman}
            </Text>
          </View>
          <View style={styles.PeriodName}>
            <Text style={[Fonts.Heading1, styles.subjectName]}>
              {period.subject_name || 'No class scheduled'}
            </Text>
            <Text style={[Fonts.Body, {color: Colors.Grey}]}>
              {period.professor || 'Unknown'} {period.subject_type}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleTimeTableNavigation('right')}>
          <Icon
            type="FontAwesome6"
            name="caret-right"
            size={15}
            color={Colors.Blue}
            style={styles.PeriodCaret}
          />
        </TouchableOpacity>
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
