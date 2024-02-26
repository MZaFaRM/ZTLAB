import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import {Colors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import AppStyles from '../../../styles';
import Icon from '../../icons';

const CustomDropdown = ({title, icon, options, type, isLast}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderItem = ({item}) => (
    <View style={styles.OptionBox}>
      <TouchableOpacity style={styles.Option}>
        <View style={styles.iconContainer}>
          <Icon
            type={item.type}
            name={item.icon}
            size={18}
            color={Colors.DarkGrey}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionTitle, Fonts.Body]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View
        style={[
          styles.MenuContainer,
          isLast ? {borderBottomWidth: 0} : {},
          isOpen
            ? {borderBottomWidth: 0, backgroundColor: Colors.LightBlue}
            : {},
        ]}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.DropdownToggle}>
          <View style={[AppStyles.FlexBox, styles.Dropdown]}>
            <View style={[AppStyles.FlexLeft, styles.DropdownInfo]}>
              <View style={styles.DropdownIcon}>
                <Icon
                  type={type}
                  name={icon}
                  size={18}
                  color={Colors.Blue}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <View style={styles.DropdownText}>
                <Text style={Fonts.Body}>{title}</Text>
              </View>
            </View>
            <View style={[AppStyles.FlexRight, styles.DropdownCaret]}>
              <Icon
                type={'FontAwesome5'}
                name={isOpen ? 'caret-up' : 'caret-down'}
                size={24}
                color={Colors.Grey}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View style={styles.DropdownContent}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={item => item.icon}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  MenuContainer: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LightGrey,
  },
  Dropdown: {
    width: '100%',
  },
  DropdownInfo: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 2,
  },
  DropdownIcon: {
    backgroundColor: Colors.White,
    aspectRatio: 1,
    width: 35,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  DropdownContent: {
    padding: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.LightGrey,
  },
  DropdownText: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  DropdownCaret: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  OptionBox: {
    flex: 1,
    marginVertical: 3,
  },
  Option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: 5,
    flex: 1,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomDropdown;
