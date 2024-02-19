import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import AppStyles from '../../styles';
import Icon from '../icons';

export default function TimeTable() {
  return (
    <View style={[styles.TimeTable, AppStyles.Box]}>
      <View style={styles.Days}>
        <TouchableOpacity
          onPress={() => {}}
          style={[AppStyles.BlueButton, styles.Circle]}>
          <Text style={[Fonts.Heading2, AppStyles.BlueText, styles.DayText]}>
            M
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[AppStyles.BlueButton, styles.Circle]}>
          <Text style={[Fonts.Body, AppStyles.BlueText, styles.DayText]}>
            T
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[AppStyles.BlueButton, styles.Circle]}>
          <Text style={[Fonts.Body, AppStyles.BlueText, styles.DayText]}>
            W
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[AppStyles.BlueButton, styles.Circle]}>
          <Text style={[Fonts.Body, AppStyles.BlueText, styles.DayText]}>
            T
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[AppStyles.BlueButton, styles.Circle, styles.SelectedDay]}>
          <Text
            style={[
              Fonts.Body,
              AppStyles.BlueText,
              styles.DayText,
              styles.SelectedDayText,
            ]}>
            F
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[AppStyles.BlueButton, styles.Circle]}>
          <Text style={[Fonts.Body, AppStyles.BlueText, styles.DayText]}>
            S
          </Text>
        </TouchableOpacity>
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
