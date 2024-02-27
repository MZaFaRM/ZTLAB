import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Fonts} from '../constants/fonts';
import {Colors} from '../constants/colors';
import {
  ProfileItem,
  SignatureItem,
  GeneralInfo,
} from '../components/sidebar/sidebar';

import {getSidebarUserInfo} from '../api/info';
import {useNavigation} from '@react-navigation/native';

import {updateHeaders} from '../api/src';
import {pages} from '../constants/pages';

import {removeAuthToken} from '../services/AuthService';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileImg, setProfileImg] = useState('');
  const [username, setUsername] = useState('');
  const [uniRegNo, setUniRegNo] = useState('');
  const [admNo, setAdmNo] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [address, setAddress] = useState('');
  const [sign, setSign] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);

    getSidebarUserInfo().then(data => {
      res = data.data;

      setProfileImg(res.profile_pic);
      setUsername(res.name);

      AsyncStorage.setItem('username', res.name);
      AsyncStorage.setItem('profile_pic', res.profile_pic);

      setUniRegNo(res.uni_reg_no);
      setAdmNo(res.admission_no);
      setMobileNo(res.mobile_no);
      setEmail(res.email);
      setAcademicYear(res.academic_year);
      setAddress(res.address);
      setSign(res.sign);

      setIsLoading(false);
    });
  }, []);

  handleLogout = () => {
    removeAuthToken()
      .then(() => {})
      .catch(e => console.log(e));
    
    navigation.replace(pages.login);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.Drawer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.drawerHeader}>
            <Image source={{uri: profileImg}} style={styles.sidebarImg} />
            <Text style={[Fonts.Heading1, styles.drawerHeaderText]}>
              {username}
            </Text>
            <TouchableOpacity>
              <Text style={[Fonts.Body]}>View Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sidebarProfile}>
            <ProfileItem label="Year" value={academicYear} />
            <ProfileItem label="Uni Reg No" value={uniRegNo} />
            <ProfileItem label="Adm No" value={admNo} />
          </View>
          <View style={styles.signature}>
            <SignatureItem sign={sign} />
          </View>
          <View style={styles.otherInfo}>
            <GeneralInfo
              iconName="phone"
              iconType="FontAwesome"
              text={mobileNo}
            />
            <GeneralInfo
              iconName="email"
              iconType="MaterialCommunityIcons"
              text={email}
            />
            <GeneralInfo
              iconName="location"
              iconType="Ionicons"
              text={address}
            />
            <GeneralInfo
              iconName="clipboard-edit"
              iconType="MaterialCommunityIcons"
              text="Change Password"
            />
            <GeneralInfo
              iconName="logout"
              iconType="MaterialIcons"
              text="Logout"
              type="red"
              onPress={handleLogout}
            />
          </View>
          <View style={styles.sourceVersion}>
            <Text
              style={[
                Fonts.Heading2,
                {color: Colors.Grey, fontWeight: 'normal'},
              ]}>
              etlab
            </Text>
            <Text style={[Fonts.Button, {color: Colors.Grey}]}>
              App Version: Un-Official 1.0.0
            </Text>
          </View>
        </>
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  Drawer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sidebarProfile: {
    marginTop: 20,
  },
  sidebarImg: {
    aspectRatio: 1,
    height: '50%',
    borderRadius: 50,
  },
  drawerHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 200,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    color: Colors.DarkGrey,
  },
  signature: {
    marginTop: 30,
  },
  otherInfo: {
    marginTop: 30,
  },
  sourceVersion: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
    minHeight: 100,
  },
});

export default CustomDrawerContent;
