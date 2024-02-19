import {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';

function Header() {
  const [semester, setSemester] = useState('VIII');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRight}>
        <Image
          source={require('../assets/images/dp.png')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.Semester}>
        <Text style={styles.headerText}>Semester :</Text>
      </View>
      <View style={[styles.headerLeft, styles.SemesterBox]}>
        <Text style={[, styles.headerText, styles.boldText]}> {semester}</Text>
        <View style={styles.SemesterPicker}>
          <Picker
            style={styles.pickerStyles}
            selectedValue={semester}
            onValueChange={setSemester}
            dropdownIconColor={Colors.Blue}
            mode="dropdown">
            <Picker.Item label="I" value="I" />
            <Picker.Item label="II" value="II" />
            <Picker.Item label="III" value="III" />
            <Picker.Item label="IV" value="IV" />
            <Picker.Item label="V" value="V" />
            <Picker.Item label="VI" value="VI" />
            <Picker.Item label="VII" value="VII" />
            <Picker.Item label="VIII" value="VIII" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '100%',
    height: 50, // Adjust the height as needed
    marginTop: 10,

    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically

    borderBottomWidth: 2, // Border width
    borderBottomColor: '#d3d3d3', // Border color

    paddingHorizontal: 25, // Add horizontal padding
  },
  fontFamily: 'inter',
  headerText: {
    color: Colors.Grey, // Choose text color
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'black',
  },
  headerImage: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    borderRadius: 50,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-start',
  },
  Semester: {
    flex: 1.4,
    alignItems: 'flex-end',
  },
  headerLeft: {
    flex: 0.6,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  SemesterBox: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically
  },
  SemesterPicker: {},
  pickerStyles: {
    color: 'black',
    width: 40,
  },
});

export default Header;
