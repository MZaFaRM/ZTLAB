const ranges = [
  {start: '08:00', end: '09:00'},
  {start: '09:00', end: '10:00'},
  {start: '10:00', end: '11:00'},
  {start: '11:00', end: '12:00'},
  {start: '12:00', end: '13:00'},
  {start: '13:00', end: '14:00'},
];

const friday_ranges = [
  {start: '08:00', end: '09:00'},
  {start: '09:00', end: '10:00'},
  {start: '10:00', end: '11:00'},
  {start: '11:00', end: '12:00'},
  {start: '01:45', end: '02:30'},
  {start: '03:15', end: '04:00'},
];

export const getCurrentRangeIndex = (friday = false) => {
  const range = friday ? friday_ranges : ranges;
  const currentTime = new Date().toLocaleTimeString('en-IN', {hour12: false});
  for (let i = 0; i < range.length; i++) {
    const {start, end} = range[i];
    if (currentTime >= start && currentTime < end) {
      return i;
    }
  }
  return -1;
};
