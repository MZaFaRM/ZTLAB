import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {login} from '../api/auth';
import Icon from '../components/icons';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';

export default function Loginpage({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(username, password) {
    setIsLoading(true);

    login(username, password).then(response => {
      if (response) {
        navigation.replace('Home');
      } else {
        console.log('Login failed');
      }
    });

    setIsLoading(false);
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
          <TextInput
            placeholder="Username"
            placeholderTextColor={Colors.Grey}
            onChangeText={setUsername}
            value={username}
            style={Fonts.Body}
          />
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
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.Grey}
            onChangeText={setPassword}
            value={password}
            style={Fonts.Body}
          />
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
          <TextInput
            placeholder="College"
            placeholderTextColor={Colors.Grey}
            onChangeText={setCollege}
            value={college}
            style={Fonts.Body}
          />
        </View>
      </View>
      <View
        style={[
          styles.SignInBox,
          isLoading
            ? {backgroundColor: Colors.Grey}
            : {backgroundColor: Colors.Blue},
        ]}>
        <TouchableOpacity
          style={styles.SignInButton}
          disabled={isLoading}
          onPress={() => {
            handleLogin(username, password);
          }}>
          <Text style={[Fonts.Body, styles.SignInText]}>Login</Text>
        </TouchableOpacity>
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
