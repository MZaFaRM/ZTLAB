import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import AppStyles from '../../styles';

import {ProgressBar, calculateColor} from '../progressbar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function OverallAttendance() {
  let attendance = 75;

  if (attendance > 100) {
    attendance = 100;
  } else if (attendance < 0) {
    attendance = 0;
  }

  return (
    <View style={[AppStyles.Box, styles.attendanceBox]}>
      <View style={styles.FlexBox}>
        <View style={styles.FlexLeft}>
          <View style={styles.Title}>
            <MaterialCommunityIcons
              name="account-check"
              size={20}
              color={Colors.Grey}
              style={styles.PeriodCaret}
            />
            <Text style={[Fonts.Body, {marginLeft: 10}]}>
              Overall Attendance
            </Text>
          </View>
          <View style={styles.Percentage}>
            <Text
              style={[
                styles.PercentageNumber,
                {color: calculateColor(attendance)},
              ]}>
              {attendance}%
            </Text>
          </View>
        </View>
        <View style={styles.FlexRight}>
          <View>
            <TouchableOpacity
              onPress={() => {}}
              style={[AppStyles.BlueButton, AppStyles.CustomButton, styles.SubjectWise]}>
              <FontAwesome5 name="clipboard" size={15} color={Colors.Blue} />
              <Text style={[Fonts.Body, AppStyles.BlueText, {marginLeft: 5}]}>
                Subject wise
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ProgressBar progress={attendance} />
    </View>
  );
}

const styles = StyleSheet.create({
  attendanceBox: {
    marginTop: 20,
  },
  Title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PercentageNumber: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  CustomButton: {
    borderRadius: 10,
    width: 125,
    padding: 10,
  },
  FlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FlexLeft: {
    flex: 1,
  },
  FlexRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  SubjectWise: {
    height: 40
  }
});
