import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../constants/constants';
import {Fonts} from '../../constants/constants';
import AppStyles from '../../constants/styles';
import Icon from '../icons';

export const ProfileItem = ({label, value}) => (
  <View style={[styles.sidebarProfileItem, AppStyles.FlexBox]}>
    <Text style={[Fonts.Body, AppStyles.FlexLeft, styles.LeftProfile]}>
      {label}
    </Text>
    <Text style={[{flex: 0.1}, Fonts.Body]}>:</Text>
    <Text style={[AppStyles.FlexLeft, styles.RightProfile, Fonts.Body]}>
      {value}
    </Text>
  </View>
);

export const SignatureItem = ({sign}) => (
  <>
    <TouchableOpacity>
      <Text style={[Fonts.Body, {color: Colors.Blue}]}>change signature</Text>
    </TouchableOpacity>
    <Image source={{uri: sign}} style={styles.sidebarImg} />
  </>
);

export const GeneralInfo = ({
  iconName,
  iconType,
  text,
  type,
  onPress = () => {},
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[AppStyles.FlexBox, styles.otherInfoItem]}>
    <View
      style={[
        styles.iconContainer,
        AppStyles.BlueButton,
        type === 'red' ? {backgroundColor: Colors.LightRed} : {},
      ]}>
      <Icon
        type={iconType}
        name={iconName}
        size={16}
        color={type === 'red' ? Colors.Red : Colors.Blue}
      />
    </View>
    <Text
      style={[
        Fonts.Body,
        AppStyles.FlexRight,
        styles.InfoText,
        type === 'red' ? {fontWeight: 'bold', color: Colors.Red} : {},
      ]}>
      {text}
    </Text>
  </TouchableOpacity>
);

styles = StyleSheet.create({
  sidebarProfileItem: {
    width: '100%',
  },
  LeftProfile: {
    color: Colors.DarkGrey,
    flex: 0.5,
  },
  RightProfile: {
    fontWeight: 'bold',
  },
  sidebarImg: {
    borderRadius: 5,
    aspectRatio: 2,
    height: 70,
    marginTop: 10,
  },
  otherInfoItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: Colors.White,
    borderRadius: 50,
    aspectRatio: 1,
    width: 35,
    marginRight: 10,
  },
  infoText: {},
});
