import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {storeAuthToken} from '../../services/AuthService';
import {login} from '../api/auth';
import {updateHeaders} from '../api/src';
import Icon from '../components/icons';
import {Colors, Fonts, pages} from '../constants/constants';

export default function LoginPage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      setIsLoading(true); 
      const response = await login(username, password);

      if (response.session_id) {
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify({username: username, password: password}),
        );

        updateHeaders('session_id', response.session_id);
        await storeAuthToken(response.session_id);
        console.log('Logged in:', response.session_id);
        navigation.replace(pages.main);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
