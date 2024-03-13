import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Header({navigation}) {
  const [semester, setSemester] = useState('VI');
  const [isLoading, setIsLoading] = useState(true);

  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profile_pic = await AsyncStorage.getItem('profile_pic');
        setProfilePic(profile_pic);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerLeft}
        onPress={() => {
          navigation.openDrawer();
        }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Image source={{uri: profilePic}} style={styles.headerImage} />
        )}
      </TouchableOpacity>
      <View style={styles.Semester}>
        <Text style={styles.headerText}>Semester :</Text>
      </View>
      <View style={[styles.headerRight, styles.SemesterBox]}>
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
    borderBottomColor: Colors.LightGrey, // Border color

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
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  Semester: {
    flex: 1.4,
    alignItems: 'flex-end',
  },
  headerRight: {
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
