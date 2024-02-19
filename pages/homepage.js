import { React } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScrollView } from 'react-native-virtualized-view';

import TimeTable from '../components/homepage/timeTable';

import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

import Attendance from '../components/homepage/attendance';

import Menu from '../components/homepage/menu';
import AppStyles from '../styles';

import Icon from '../components/icons';

export default function Homepage() {
  return (
    <ScrollView
      contentContainerStyle={styles.Homepage}
      showsVerticalScrollIndicator={false}>
      <View style={styles.Profile}>
        <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
          Muhammed Zafar M M
        </Text>
        <Text style={[Fonts.Body]}>Computer Science Student 2021</Text>
        <Text style={[Fonts.Body]}>
          Roll No :
          <Text style={[Fonts.Body, {color: Colors.DarkGrey}]}> 34</Text>
        </Text>
      </View>
      <View style={styles.Marks}>
        <View style={styles.CGPA}>
          <Text style={Fonts.Body}>CGPA</Text>
          <Text style={[Fonts.Heading2, styles.Score]}>9.12</Text>
        </View>
        <View style={styles.PrevCGPA}>
          <Text style={Fonts.Body}>Prev - CGPA</Text>
          <Text style={[Fonts.Heading2, styles.Score]}>9.57</Text>
        </View>
        <View style={styles.Analysis}>
          <TouchableOpacity
            onPress={() => {}}
            style={[AppStyles.BlueButton, AppStyles.CustomButton]}>
            <Icon
              type="Entypo"
              name="bar-graph"
              size={15}
              color={Colors.Blue}
            />
            <Text style={[Fonts.Body, AppStyles.BlueText, {marginLeft: 5}]}>
              Analysis
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TimeTable />
      <Attendance />
      <Menu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Homepage: {
    padding: 25,
    paddingTop: 15,
  },
  Profile: {},
  Marks: {
    marginTop: 20,

    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically
  },
  Score: {
    fontSize: 30,
    color: Colors.Blue,
  },
  CGPA: {
    flex: 1,
    alignItems: 'flex-start',
  },
  PrevCGPA: {
    flex: 1,
    alignItems: 'flex-start',
  },
});