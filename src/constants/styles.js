import {StyleSheet} from 'react-native';
import {Colors} from './constants';

export default AppStyles = StyleSheet.create({
  Box: {
    borderColor: Colors.LightGrey,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    padding: 15,
    marginTop: 20,
    overflow: 'hidden'
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
  FlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FlexLeft: {
    flex: 1,
  },
  FlexRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
