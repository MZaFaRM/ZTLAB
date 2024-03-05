import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import AppStyles from '../../styles';
import Icon from '../icons';
import {getTimeTable} from '../../api/info';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimeTable() {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [period, setPeriod] = useState({});
  const [periodNumber, setPeriodNumber] = useState(-1);

  const dayLabels = ['', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const handleChangeDay = () => {
      if (currentDay !== new Date().getDay()) {
        setCurrentDay(new Date().getDay());
        return true;
      }
    };
    const handleChangePeriod = () => {
      let currentTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });
      let _periodNumber = -1;
      if (currentTime === '8:00:00 AM') {
        _periodNumber = 1;
      } else if (currentTime === '9:00:00 AM') {
        _periodNumber = 2;
      } else if (currentTime === '10:00:00 AM') {
        _periodNumber = 3;
      } else if (currentTime === '11:00:00 AM') {
        _periodNumber = 4;
      } else if (currentTime === '12:00:00 PM') {
        _periodNumber = 5;
      } else if (currentTime === '1:00:00 PM') {
        _periodNumber = 6;
      } else if (currentTime === '2:00:00 PM') {
        _periodNumber = 7;
      } else if (currentTime === '3:00:00 PM') {
        _periodNumber = 8;
      } else if (currentTime === '4:00:00 PM') {
        _periodNumber = 9;
      } else if (currentTime === '5:00:00 PM') {
        _periodNumber = 10;
      }
      if (_periodNumber !== -1 && _periodNumber !== periodNumber) {
        setPeriodNumber(_periodNumber);
        return true;
      }
    };

    const handleTimeTableData = async day => {
      try {
        let timeTable = await AsyncStorage.getItem('timeTable');
        if (timeTable && timeTable.day === day) {
          setTimeTable(timeTable);
          return timeTable;
        } else {
          timeTable = await getTimeTable(day).data;
          await AsyncStorage.setItem('timeTable', timeTable);
          setTimeTable(timeTable);
          return timeTable;
        }
      } catch (error) {
        console.log('Error fetching timetable: ', error);
        handleUnauthorizedAccess(error, navigation);
      }
    };

    const intervalId = setInterval(() => {
      day = new Date().getDay();
      if (day !== currentDay) {
        setCurrentDay(day);
        let currentTime = new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
        });
        if (currentTime === '8:00:00 AM') {
          getTimeTable()
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }, 60000);
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
