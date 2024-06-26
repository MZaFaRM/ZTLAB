import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GeneralInfo,
  ProfileItem,
  SignatureItem,
} from '../components/sidebar/sidebar';

import {useNavigation} from '@react-navigation/native';
import {getSidebarUserInfo} from '../api/info';

import {Colors, Fonts, pages} from '../constants/constants';

import {removeAuthToken} from '../../services/AuthService';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../components/icons';

import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {handleUnauthorizedAccess} from '../api/auth';

const SideBar = props => {
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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getSidebarUserInfo();
        const userData = response.data;

        setProfileImg(userData.profile_pic);
        setUsername(userData.name);
        setUniRegNo(userData.uni_reg_no);
        setAdmNo(userData.admission_no);
        setMobileNo(userData.mobile_no);
        setEmail(userData.email);
        setAcademicYear(userData.academic_year);
        setAddress(userData.address);
        setSign(userData.sign);

        await AsyncStorage.setItem('profile_pic', userData.profile_pic);
      } catch (error) {
        console.error('Error fetching user info:', error);
        await handleUnauthorizedAccess(error, navigation);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await removeAuthToken();
    await AsyncStorage.removeItem('userData');
    navigation.replace(pages.login);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.Drawer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.drawerHeader}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                },
              ]}>
              <View style={styles.sidebarImgBox}>
                <Image source={{uri: profileImg}} style={styles.sidebarImg} />
              </View>
              <TouchableOpacity
                style={styles.iconBox}
                // onPress={() => handleChoosePhoto()}
              >
                <Icon
                  type="MaterialIcons"
                  name="verified"
                  size={14}
                  color={Colors.Green}
                />
              </TouchableOpacity>
            </View>

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
              onPress={() => {
                handleLogout();
              }}
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
  sidebarImgBox: {
    height: 80,
  },
  sidebarImg: {
    aspectRatio: 1,
    height: '100%',
    borderRadius: 50,
  },
  iconBox: {
    borderRadius: 50,
    backgroundColor: 'white',
    right: 20,
    aspectRatio: 1,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'black',
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

export default SideBar;

// const handleChoosePhoto = () => {
//   const options = {
//     title: 'Select a Photo',
//     cancelButtonTitle: 'Cancel',
//     takePhotoButtonTitle: 'Take Photo...',
//     chooseFromLibraryButtonTitle: 'Choose from Library...',
//     mediaType: 'photo',
//     quality: 1,
//   };

//   ImagePicker.launchImageLibrary(options, async response => {
//     if (response.didCancel) {
//       //     } else if (response.error) {
//       //     } else {
//       try {
//         // Resize the image to the desired dimensions
//         const resizedImage = await ImageResizer.createResizedImage(
//           response.assets[0].uri,
//           150, // target width
//           200, // target height
//           'JPEG', // image format
//           100, // quality
//           0, // rotation
//           null, // output path (null = create a temp file)
//           false, // do not preserve metadata
//           {mode: 'contain', onlyScaleDown: true}, // resize mode options
//         );

//         const fileSizeInBytes = resizedImage.size;
//         const maxSizeBytes = 1 * 1024 * 1024; // 1MB in bytes
//         if (fileSizeInBytes > maxSizeBytes) {
//           //           return;
//         }

//         //       } catch (error) {
//         //       }
//     }
//   });
// };
