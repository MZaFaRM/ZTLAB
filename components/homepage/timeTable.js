import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import AppStyles from '../../styles';
import Icon from '../icons';
import {getTimeTable} from '../../api/info';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimeTable() {
  const [currentDay, setCurrentDay] = useState();
  const [period, setPeriod] = useState({});
  const [timetable, setTimeTable] = useState([]);

  const dayLabels = ['', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    // Check if new day
    // If new day
    // Update current day
    // Check for timetable in Async Storage else send API
    // Then adjust period according to time

    const fetchTimeTable = async day => {
      try {
        let timetable = JSON.parse(await AsyncStorage.getItem('timetable'));
        if (!timetable || timetable.day != day) {
          let timetableData = await getTimeTable(day);
          timetable = timetableData.data

          await AsyncStorage.setItem('timetable', JSON.stringify(timetable));
          setTimeTable(timetable);
        }
        return timetable;
      } catch (error) {
        console.log(error);
      }
    };

    const convertToDecimalTime = currentTime => {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const decimalTime = hours + minutes / 60;

      return decimalTime;
    };

    const isBetween = (startTime, endTime, currentTime) => {
      const startMinutes = Math.floor(startTime) * 60 + (startTime % 1) * 100;
      const endMinutes = Math.floor(endTime) * 60 + (endTime % 1) * 100;
      const currentMinutes =
        Math.floor(currentTime) * 60 + (currentTime % 1) * 100;

      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    };

    const isInterval = (time, interval) => {
      return isBetween(interval[0], interval[1], time);
    };

    const getCurrentPeriodIndex = currentDay => {
      let _periodNumber = 0;
      let decimalCurrentTime = convertToDecimalTime(currentDay);

      const timePeriods = {
        mondayToThursday: [9, 10, 1, 2, 3],
        friday: [9, 10, 11, 14.5, 15.25],
      };

      const intervalTimings = {
        mondayToThursday: [12.0, 13.0],
        friday: [12.0, 13.75],
      };

      let todaysTimings = NaN;
      let todaysInterval = NaN;
      if (currentDay === 5) {
        todaysTimings = timePeriods.friday;
        todaysInterval = intervalTimings.friday;
      } else {
        todaysTimings = timePeriods.mondayToThursday;
        todaysInterval = intervalTimings.mondayToThursday;
      }

      if (
        isInterval(decimalCurrentTime, todaysInterval) || // If is interval
        decimalCurrentTime < todaysTimings[0] || // or if early than class
        decimalCurrentTime > todaysTimings[todaysTimings.length - 1] // or late after class
      ) {
        return -1;
      }

      for (
        _periodNumber = 0;
        decimalCurrentTime < todaysTimings[_periodNumber];
        _periodNumber++
      );

      return _periodNumber;
    };

    const setCurrentPeriod = index => {
      if (index != -1) {
        setPeriod(timetable.at(index));
      }
    };

    const intervalId = setInterval(async () => {
      let day = new Date(2024, 3, 18, 10, 30, 0, 0);

      let dayIndex = day.getDay();
      console.log(dayIndex);
      if (dayIndex !== currentDay) {
        setCurrentDay(dayIndex);
        if (dayIndex !== 0) {
          let timeTable = await fetchTimeTable(dayIndex);
          setTimeTable(timeTable);
          console.log('Fetched', timetable);
        }
      }
      if (dayIndex !== 0) setCurrentPeriod(getCurrentPeriodIndex(day));

      console.log("End", timetable);
    }, 6000);

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
            <Text style={[Fonts.Body, {color: Colors.Grey}]}>Period III</Text>
          </View>
          <View style={styles.PeriodName}>
            <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
              ITT401 - Data Analysis
            </Text>
            <Text style={[Fonts.Body, {color: Colors.Grey}]}>
              By Prof. John Doe [Theory]
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
