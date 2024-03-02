import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import {login} from '../api/auth';
import Icon from '../components/icons';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';
import {pages} from '../constants/pages';
import {updateHeaders} from '../api/src';
import {storeAuthToken} from '../services/AuthService';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default function Loginpage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(username, password) {
    setIsLoading(true);

    login(username, password)
      .then(response => {
        if (response) {
          updateHeaders('session_id', response.session_id);
          storeAuthToken(response.session_id)
            .then(() => {
              console.log('Logged in:', response.session_id);
            })
            .catch(err => {
              console.log('Error logging in:', err);
              setIsLoading(false);
            });

          navigation.replace(pages.main);
        } else {
          console.log('Login failed');
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log('Error logging in:', err);
        setIsLoading(false);
      });
  }

  return (
    <View>
      <View style={styles.TopBox}>
        <View style={{flex: 1}} />
        <View style={{flex: 1}} />
        <View style={styles.HeadingBox}>
          <Text style={styles.HeadingText}>ETLAB</Text>
        </View>
      </View>
      <View style={styles.AuthFields}>
        <View style={styles.AuthField}>
          <View style={styles.IconButton}>
            <Icon
              type="Feather"
              name="user"
              size={20}
              color={Colors.DarkGrey}
            />
          </View>
          <View style={{width: '100%'}}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={Colors.Grey}
              onChangeText={setUsername}
              value={username}
              style={[Fonts.Body, {marginRight: 50}]}
            />
          </View>
        </View>
        <View style={styles.AuthField}>
          <View style={styles.IconButton}>
            <Icon
              type="FontAwesome"
              name="lock"
              size={20}
              color={Colors.DarkGrey}
            />
          </View>
          <View style={{width: '100%'}}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={Colors.Grey}
              onChangeText={setPassword}
              value={password}
              style={[Fonts.Body, {marginRight: 50}]}
            />
          </View>
        </View>
        <View style={styles.AuthField}>
          <View style={styles.IconButton}>
            <Icon
              type="FontAwesome"
              name="building"
              size={20}
              color={Colors.DarkGrey}
            />
          </View>
          <View style={{width: '100%'}}>
            <Picker
              style={[Fonts.Body, {marginRight: 50, marginLeft: -15}]}
              selectedValue={college}
              onValueChange={setCollege}
              dropdownIconColor={Colors.Blue}
              mode="dropdown">
              <Picker.Item label="KMCT College of Engineering" value="kmctce" />
            </Picker>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.SignInBox,
          isLoading
            ? {backgroundColor: Colors.Grey}
            : {backgroundColor: Colors.Blue},
        ]}>
        {isLoading ? (
          <ActivityIndicator
            style={styles.SignInButton}
            size="small"
            color="#fff"
          />
        ) : (
          <TouchableOpacity
            style={styles.SignInButton}
            disabled={isLoading}
            onPress={() => {
              handleLogin(username, password);
            }}>
            <Text style={[Fonts.Body, styles.SignInText]}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{Flex: 1, alignItems: 'flex-end', marginTop: 5}}>
          <Text style={Fonts.Body}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopBox: {
    width: '100%',
    height: '50%',

    marginBottom: 30,
  },
  HeadingBox: {
    width: '100%',
    height: '50%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  HeadingText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 80,
    color: Colors.DarkGrey,
  },
  AuthField: {
    flexDirection: 'row',
    alignItems: 'center',

    borderColor: Colors.Grey,
    borderWidth: 1,
    borderRadius: 10,

    marginHorizontal: 50,
    padding: 3,
    marginVertical: 5,

    height: 45,
  },
  IconButton: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    aspectRatio: 1,
    width: 30,
    margin: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  SignInBox: {
    backgroundColor: Colors.Blue,
    marginHorizontal: 50,
    marginVertical: 10,
    height: 30,

    borderRadius: 10,
    height: 45,
  },
  SignInButton: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInText: {
    fontWeight: 'bold',
    color: Colors.White,
    fontSize: 20,
  },
});
