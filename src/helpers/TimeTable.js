import {getTimeTable} from '../api/info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchAndUpdateTimetable = async () => {
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

  const convertToDecimalTime = currentTime => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return hours + minutes / 60;
  };
  const getCurrentPeriodIndex = (currentDay, currentTime, timetable) => {
    // Ensure the timetable is not empty and the current day is valid
    if (
      !timetable ||
      timetable.length === 0 ||
      currentDay < 1 ||
      currentDay > 5
    ) {
      return -1; // Return -1 to indicate no current period
    }

    // Define time periods for different days of the week
    const timePeriods = {
      mondayToThursday: [9, 10, 13, 14, 15, 16], // Start times of periods for Monday to Thursday
      friday: [9, 10, 11, 14.5, 15.25, 16], // Start times of periods for Friday
    };
    const intervalTimings = {
      mondayToThursday: [12.0, 13.0],
      friday: [12.0, 13.75],
    };

    // Get the appropriate time periods for the current day
    const todaysTimings =
      currentDay === 5 ? timePeriods.friday : timePeriods.mondayToThursday;
    const todaysInterval =
      currentDay === 5
        ? intervalTimings.friday
        : intervalTimings.mondayToThursday;

    // Convert current time to decimal format for comparison
    const decimalCurrentTime = convertToDecimalTime(currentTime);

    if (
      isInterval(decimalCurrentTime, todaysInterval) || // If is interval
      decimalCurrentTime < todaysTimings[0] || // or if early than class
      decimalCurrentTime > todaysTimings[todaysTimings.length - 1] // or late after class
    ) {
      return -1;
    }

    // Iterate through the time periods to find the current period index
    for (
      let periodIndex = 0;
      periodIndex < todaysTimings.length;
      periodIndex++
    ) {
      const periodStartTime = todaysTimings[periodIndex];
      const nextPeriodStartTime = todaysTimings[periodIndex + 1];

      // Check if the current time falls within the current period's time range
      if (isBetween(periodStartTime, nextPeriodStartTime, decimalCurrentTime)) {
        return periodIndex;
      }
    }

    // If the current time does not fall within any period, return -1
    return -1;
  };

  function numberToRoman(num) {
    if (num < 1 || num > 10) {
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
  }

  try {
    const day = new Date();
    const dayIndex = day.getDay();
    const currentDay = dayIndex;
    let timetable = [];

    if (dayIndex !== 0) {
      timetable = await fetchTimeTable(dayIndex);
    }

    const currentPeriodIndex = getCurrentPeriodIndex(dayIndex, day, timetable);
    const currentPeriod =
      currentPeriodIndex !== -1 ? timetable.subjects[currentPeriodIndex] : {};

    const currentPeriodIndexRoman = numberToRoman(currentPeriodIndex + 1);

    currentPeriod['roman'] = currentPeriodIndexRoman;

    return {currentDay, currentPeriod};
  } catch (error) {
    console.error('Error fetching and updating timetable:', error);
    throw error;
  }
};

export default fetchAndUpdateTimetable;
