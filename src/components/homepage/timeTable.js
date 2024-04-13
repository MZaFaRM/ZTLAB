import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/constants';
import {Fonts} from '../../constants/constants';
import AppStyles from '../../constants/styles';
import Icon from '../icons';
import fetchAndUpdateTimetable from '../../helpers/TimeTable';
import Day from 'react-native-calendars/src/calendar/day';

export default function TimeTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState();
  const [period, setPeriod] = useState({});
  const [periodIndex, setPeriodIndex] = useState(-1);
  const [dayIndex, setDayIndex] = useState(null);

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
      if (day.getDay() === 0) {
        const dayToFetch = dayIndex !== null ? dayIndex : day.getDay();

        setIsLoading(true);
        const {
          currentDay,
          currentPeriod,
          periodIndex: newIndex,
        } = await fetchAndUpdateTimetable(day, dayToFetch, periodIndex);
        setIsLoading(false);

        setCurrentDay(currentDay);
        setPeriod(currentPeriod);
        setPeriodIndex(newIndex);
      }
    } catch (error) {
      console.error('Error updating timetable data:', error);
    }
  };

  useEffect(() => {
    if (dayIndex !== null) {
      const intervalId = setInterval(() => setDayIndex(null), 60000);
      return () => clearInterval(intervalId);
    }
  });

  useEffect(() => {
    updateTimetableData();
    const intervalId = setInterval(updateTimetableData, 60000);
    return () => clearInterval(intervalId);
  }, [periodIndex, dayIndex]);

  const getDayStyle = dayNumber => {
    return dayNumber === currentDay
      ? [styles.SelectedDay, styles.SelectedDayText]
      : [];
  };

  return (
    <View style={[styles.TimeTable, AppStyles.Box]}>
      <View style={styles.Days}>
        {[1, 2, 3, 4, 5, 6].map(dayNumber => (
          <TouchableOpacity
            key={dayNumber}
            onPress={() => setDayIndex(dayNumber)}
            style={[
              AppStyles.BlueButton,
              styles.Circle,
              ...getDayStyle(dayNumber),
            ]}>
            {isLoading && dayIndex === dayNumber ? (
              <ActivityIndicator size="small" color={Colors.Blue} />
            ) : (
              <Text
                style={[
                  Fonts.Body,
                  AppStyles.BlueText,
                  styles.DayText,
                  ...getDayStyle(dayNumber),
                ]}>
                {dayLabels[dayNumber]}
              </Text>
            )}
          </TouchableOpacity>
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
              {period.subject_name || 'No classes scheduled'}
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
