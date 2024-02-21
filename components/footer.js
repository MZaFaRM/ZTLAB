import {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/colors';
import Icon from './icons';

export default function Footer({currentPage = 'home'}) {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <View style={styles.Footer}>
      <TouchableOpacity
        style={[
          styles.FooterOption,
          page == 'home' ? {borderTopColor: Colors.Blue} : {},
        ]}
        onPress={() => setPage('home')}>
        <Icon
          type="AntDesign"
          name="home"
          size={25}
          color={page == 'home' ? Colors.Blue : Colors.Grey}
          style={styles.PeriodCaret}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.FooterOption,
          page == 'assignments' ? {borderTopColor: Colors.Blue} : {},
        ]}
        onPress={() => setPage('assignments')}>
        <Icon
          type="FontAwesome"
          name="book"
          size={25}
          color={page == 'assignments' ? Colors.Blue : Colors.Grey}
          style={styles.PeriodCaret}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.FooterOption,
          page == 'alerts' ? {borderTopColor: Colors.Blue} : {},
        ]}
        onPress={() => setPage('alerts')}>
        <Icon
          type="FontAwesome5"
          name="bell"
          size={25}
          color={page == 'alerts' ? Colors.Blue : Colors.Grey}
          style={styles.PeriodCaret}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Footer: {
    height: 60,
    flexDirection: 'row',
  },
  FooterOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderTopColor: Colors.LightGrey,
    borderTopWidth: 2,
  },
});
