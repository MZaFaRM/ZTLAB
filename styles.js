import {StyleSheet} from 'react-native';
import {Colors} from './constants/colors';

export default AppStyles = StyleSheet.create({
  Box: {
    borderColor: Colors.LightGrey,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    padding: 20,
  },
  BlueButton: {
    backgroundColor: Colors.White,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BlueText: {
    color: Colors.Blue,
    fontWeight: 'bold',
  },
  CustomButton: {
    borderRadius: 10,
    width: 125,
    padding: 10,
  },
});
