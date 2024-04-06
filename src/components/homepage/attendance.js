import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/constants';
import {Fonts} from '../../constants/constants';
import AppStyles from '../../constants/styles';
import {pages} from '../../constants/constants';

import {ProgressBar, calculateColor} from './progressbar';
import Icon from '../icons';
import {useNavigation} from '@react-navigation/native';

export default function OverallAttendance({attendance}) {
  const navigation = useNavigation();

  if (attendance > 100) {
    attendance = 100;
  } else if (attendance < 0) {
    attendance = 0;
  }

  return (
    <View style={[AppStyles.Box, styles.attendanceBox]}>
      <View style={AppStyles.FlexBox}>
        <View style={AppStyles.FlexLeft}>
          <View style={styles.Title}>
            <Icon
              type="MaterialCommunityIcons"
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
              onPress={() => {
                navigation.navigate(pages.subjectWiseAttendance);
              }}
              style={[
                AppStyles.BlueButton,
                AppStyles.CustomButton,
                styles.SubjectWise,
              ]}>
              <Icon
                type="FontAwesome5"
                name="clipboard"
                size={15}
                color={Colors.Blue}
              />
              <Text style={[Fonts.Body, AppStyles.BlueText, {marginLeft: 10}]}>
                Subject Wise
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
  attendanceBox: {},
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
  SubjectWise: {
    height: 40,
  },
});
