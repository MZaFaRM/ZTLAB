import {React, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Header = ({title}) => {
  const [selectedValue, setSelectedValue] = useState('Option 1');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRight}>
        <Image
          source={require('./assets/images/dp.webp')}
          style={styles.headerImage}
        />
      </View>
      <View style={[styles.headerLeft, styles.SemesterBox]}>
        <Text style={styles.headerText}>Semester: </Text>
        <View style={styles.SemesterPicker}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Option 1" value="I" />
            <Picker.Item label="Option 2" value="II" />
            <Picker.Item label="Option 3" value="III" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60, // Adjust the height as needed

    backgroundColor: 'red',

    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically

    borderBottomWidth: 3, // Border width
    borderBottomColor: '#d3d3d3', // Border color
  },
  headerText: {
    margin: 10,
    color: '#d3d3d3', // Choose text color
    fontSize: 15, // Adjust font size as needed
    fontWeight: 'normal',
  },
  headerImage: {
    marginLeft: 10,

    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    borderRadius: 50,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerLeft: {
    paddingLeft: 10,
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'flex-end',
  },
  SemesterBox: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically
  },
  SemesterPicker: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default function App() {
  return <Header title="Zafar" />;
}
