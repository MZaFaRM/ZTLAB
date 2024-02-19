import {React} from 'react';
import {View, StatusBar} from 'react-native';

import Header from './components/header';
import Homepage from './pages/homepage';

export default function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#FFFFFF'); // Light color, such as white

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header />
      <Homepage />
    </View>
  );
}
