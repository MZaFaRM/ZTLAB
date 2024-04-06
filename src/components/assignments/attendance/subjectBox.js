import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../../icons';
import {Colors} from '../../../constants/constants';
import {Fonts} from '../../../constants/constants';
import AppStyles from '../../../constants/styles';
import {ProgressBar} from '../../homepage/progressbar';

const AttendanceQuota = ({PresentClasses, TotalClasses}) => {
  const [target, setTarget] = useState('75');

  const handleInputChange = value => {
    if (value === '' || (value < 100 && value > 0)) {
      setTarget(value);
    }
  };

  const calculateAttendance = targetPercentage => {
    if (targetPercentage === '') {
      return (
        <Text style={[Fonts.Heading2, styles.Score, {color: Colors.Grey}]}>
          00
        </Text>
      );
    }
    const targetPercentageInt = parseInt(targetPercentage);

    const calculateResult = value => {
      if (isNaN(value) || value < 0) {
        return (
          <Text style={[Fonts.Heading2, styles.Score, {color: Colors.Red}]}>
            NaN
          </Text>
        );
      }
      return value;
    };

    if (
      isNaN(targetPercentageInt) ||
      targetPercentageInt < 0 ||
      targetPercentageInt > 100
    ) {
      return calculateResult();
    }

    const attendancePercentage = (PresentClasses / TotalClasses) * 100;

    if (attendancePercentage >= targetPercentageInt) {
      const classesCanMiss =
        (PresentClasses * 100 - targetPercentageInt * TotalClasses) /
        targetPercentageInt;
      return (
        <Text style={[Fonts.Heading2, styles.Score, {color: Colors.Green}]}>
          {classesCanMiss === 0
            ? classesCanMiss
            : `+${Math.floor(classesCanMiss)}`}
        </Text>
      );
    } else {
      const classesNeeded =
        (targetPercentageInt * TotalClasses - PresentClasses * 100) /
        (100 - targetPercentageInt);
      return (
        <Text style={[Fonts.Heading2, styles.Score, {color: Colors.Red}]}>
          {classesNeeded === 0
            ? classesNeeded
            : `-${Math.floor(classesNeeded)}`}
        </Text>
      );
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[Fonts.Heading2, styles.Score, styles.LeaveQuotaInput]}
          value={target}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        <Text
          style={[
            Fonts.Heading2,
            styles.Score,
            {color: Colors.Blue, fontSize: 15, marginTop: 4},
          ]}>
          %
        </Text>
      </View>
      {calculateAttendance(target)}
    </View>
  );
};

export const SubjectBox = ({
  SubjectTitle,
  PresentClasses,
  TotalClasses,
  DutyLeaves,
  DutyLeavePercentage,
  AttendancePercentage,
}) => {
  return (
    <View style={[styles.SubjectBox]}>
      <View style={styles.SubjectHeadingBox}>
        <Text style={[Fonts.Body, styles.SubjectTitle]}>{SubjectTitle}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            type="FontAwesome6"
            name="caret-right"
            size={18}
            color={Colors.Blue}
            style={styles.SubjectMoreInfoCaret}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.SubjectBodyBox}>
        <View style={[AppStyles.FlexBox, {marginVertical: 10}]}>
          <View style={[AppStyles.FlexLeft]}>
            <View style={[{flexDirection: 'row'}]}>
              <Icon
                type="FontAwesome5"
                name="users"
                size={16}
                color={Colors.DarkGrey}
                style={styles.SubjectBodyIcon}
              />
              <Text style={[Fonts.Button]}>Attendance</Text>
            </View>
            <Text style={[Fonts.Heading1, styles.Score]}>
              {AttendancePercentage}%
            </Text>
          </View>
          <View style={[AppStyles.FlexLeft, styles.DutyLeaveBox]}>
            <View style={[{flexDirection: 'row'}]}>
              <Icon
                type="FontAwesome6"
                name="user-gear"
                size={16}
                color={Colors.DarkGrey}
                style={styles.SubjectBodyIcon}
              />
              <Text style={[Fonts.Button]}>Duty Leave</Text>
            </View>
            <Text style={[Fonts.Heading2, styles.Score, {color: Colors.Grey}]}>
              {DutyLeaves}
              <Text
                style={[
                  Fonts.Heading2,
                  styles.Score,
                  {color: Colors.Grey, fontSize: 15},
                ]}>
                {' '}
                {DutyLeavePercentage}%
              </Text>
            </Text>
          </View>
          <View style={[AppStyles.FlexLeft, styles.LeaveQuotaBox]}>
            <View style={[{flexDirection: 'row'}]}>
              <Icon
                type="FontAwesome6"
                name="chart-pie"
                size={16}
                color={Colors.DarkGrey}
                style={styles.SubjectBodyIcon}
              />
              <Text style={[Fonts.Button]}>Leave Quota</Text>
            </View>
            <AttendanceQuota
              PresentClasses={PresentClasses}
              TotalClasses={TotalClasses}
            />
          </View>
        </View>
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <Text style={Fonts.Body}>
            Total classes:{' '}
            <Text style={{fontWeight: 'bold'}}>
              {PresentClasses} / {TotalClasses}
            </Text>
          </Text>
        </View>
        <ProgressBar progress={AttendancePercentage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SubjectTitle: {
    color: Colors.DarkGrey,
    fontWeight: 'normal',
    flex: 1,
  },
  Score: {
    fontSize: 45,
    color: Colors.Green,
    fontWeight: 'bold',
  },
  SubjectBox: {
    borderWidth: 2,
    borderColor: Colors.LightGrey,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,

    marginBottom: 20,
  },
  SubjectHeadingBox: {
    backgroundColor: Colors.LightBlue,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LightGrey,
    flexDirection: 'row',
    alignItems: 'center',

    height: 60,
  },
  SubjectBodyBox: {
    padding: 10,
    backgroundColor: 'white',
  },
  DutyLeaveBox: {
    alignItems: 'center',
  },
  LeaveQuotaBox: {
    alignItems: 'flex-end',
  },
  SubjectMoreInfoCaret: {
    marginRight: 10,
  },
  SubjectBodyIcon: {
    marginRight: 5,
  },
  LeaveQuotaInput: {
    color: Colors.Blue,
    fontSize: 15,
    padding: 0,
    textAlign: 'center',
    paddingBottom: 5,
  },
});
