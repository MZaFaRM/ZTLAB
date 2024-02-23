import {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/colors';
import Icon from '../icons';
import {useNavigation} from '@react-navigation/native';
import { pages } from '../../constants/pages';
import { updateHeaders } from '../../api/src';

export default function Footer({currentPage = pages.home}) {
  const [page, setPage] = useState(currentPage);
  const navigation = useNavigation();

  const handlePageChange = page => {
    setPage(page);
    navigation.navigate(page);
  };

  return (
    <View style={styles.Footer}>
      <TouchableOpacity
        style={[
          styles.FooterOption,
          page === pages.home ? {borderTopColor: Colors.Blue} : {},
        ]}
        onPress={() => handlePageChange(pages.home)}>
        <Icon
          type="AntDesign"
          name="home"
          size={25}
          color={page === pages.home ? Colors.Blue : Colors.Grey}
          style={styles.PeriodCaret}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.FooterOption,
          page === pages.assignments ? {borderTopColor: Colors.Blue} : {},
        ]}
        onPress={() => handlePageChange(pages.assignments)}>
        <Icon
          type="FontAwesome"
          name="book"
          size={25}
          color={page === pages.assignments ? Colors.Blue : Colors.Grey}
          style={styles.PeriodCaret}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.FooterOption,
          page === 'alerts' ? {borderTopColor: Colors.Blue} : {},
        ]}
        onPress={() => handlePageChange('alerts')}>
        <Icon
          type="FontAwesome5"
          name="bell"
          size={25}
          color={page === 'alerts' ? Colors.Blue : Colors.Grey}
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
