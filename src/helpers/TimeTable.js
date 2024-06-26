import {getTimeTable} from '../api/info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchTimeTable = async day => {
  try {
    let timetable = JSON.parse(await AsyncStorage.getItem('timetable'));
    if (!timetable || timetable.day !== day) {
      const timetableData = await getTimeTable(day);
      timetable = timetableData.data;
      await AsyncStorage.setItem('timetable', JSON.stringify(timetable));
    }
    return timetable;
  } catch (error) {
    console.error('Error fetching timetable:', error);
    throw error;
  }
};

const isBetween = (startTime, endTime, currentTime) => {
  return startTime <= currentTime && currentTime <= endTime;
};

const isInterval = (time, interval) => {
  return isBetween(interval[0], interval[1], time);
};

const convertToDecimalTime = day => {
  const hours = day.getHours();
  const minutes = day.getMinutes();
  return hours + minutes / 60;
};

const getCurrentPeriodIndex = (day, dayIndex, timetable) => {
  if (
    !timetable ||
    timetable.length === 0 ||
    dayIndex < 1 ||
    dayIndex > 5
  ) {
    return -1;
  }

  const timePeriods = {
    mondayToThursday: [9, 10, 11, 13, 14, 15, 16],
    friday: [9, 10, 11, 14.5, 15.25, 16],
  };
  const intervalTimings = {
    mondayToThursday: [12.0, 13.0],
    friday: [12.0, 13.75],
  };

  const todaysTimings =
    dayIndex === 5 ? timePeriods.friday : timePeriods.mondayToThursday;
  const todaysInterval =
    dayIndex === 5
      ? intervalTimings.friday
      : intervalTimings.mondayToThursday;

  const decimalCurrentTime = convertToDecimalTime(day);

  if (
    isInterval(decimalCurrentTime, todaysInterval) ||
    decimalCurrentTime < todaysTimings[0] ||
    decimalCurrentTime > todaysTimings[todaysTimings.length - 1]
  ) {
    return -1;
  }

  for (let periodIndex = 0; periodIndex < todaysTimings.length; periodIndex++) {
    const periodStartTime = todaysTimings[periodIndex];
    const nextPeriodStartTime = todaysTimings[periodIndex + 1];
    if (isBetween(periodStartTime, nextPeriodStartTime, decimalCurrentTime)) {
      return periodIndex;
    }
  }

  return -1;
};

const numberToRoman = num => {
  if (num < 1 || num > 9) {
    return 'Nil';
  }

  const romanNumerals = [
    {value: 10, symbol: 'X'},
    {value: 9, symbol: 'IX'},
    {value: 5, symbol: 'V'},
    {value: 4, symbol: 'IV'},
    {value: 1, symbol: 'I'},
  ];

  let result = '';
  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      result += numeral.symbol;
      num -= numeral.value;
    }
  }
  return result;
};

const fetchAndUpdateTimetable = async (day, dayIndex, periodIndex = undefined) => {
  try {
    let timetable = [];
    if (dayIndex !== 0) {
      timetable = await fetchTimeTable(dayIndex);
    }

    const currentPeriodIndex =
      periodIndex === -1
        ? getCurrentPeriodIndex(day, dayIndex, timetable)
        : periodIndex;

    const currentPeriodIndexRoman = numberToRoman(currentPeriodIndex + 1);

    let currentPeriod = {};
    if (currentPeriodIndex !== -1) {
      currentPeriod = timetable.subjects[currentPeriodIndex];
    }    currentPeriod['roman'] = currentPeriodIndexRoman;

    return {
      currentDay: dayIndex,
      currentPeriod,
      periodIndex: currentPeriodIndex,
    };
  } catch (error) {
    console.error('Error fetching and updating timetable:', error);
    throw error;
  }
};

export default fetchAndUpdateTimetable;
