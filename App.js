import {React} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import Header from './components/header';
import {Colors} from './constants/colors';
import {Fonts} from './constants/fonts';

export default function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#FFFFFF'); // Light color, such as white

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header />
      <View style={styles.Homepage}>
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
              style={[styles.AnalysisButton]}>
              <Entypo name="bar-graph" size={15} color={Colors.Blue} />
              <Text style={[Fonts.Body, styles.AnalysisText]}>Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  AnalysisButton: {
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 10,
    width: 125,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AnalysisText: {
    color: Colors.Blue,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
