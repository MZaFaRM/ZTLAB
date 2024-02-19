import {React} from 'react';
import {View, StatusBar} from 'react-native';

import Header from './components/header';
import Footer from './components/footer';
import Homepage from './pages/homepage';

export default function App() {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#FFFFFF'); // Light color, such as white

  let CurrentPage = 'home';

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header />
      <Homepage />
      <Footer currentPage={CurrentPage} />
    </View>
  );
}
