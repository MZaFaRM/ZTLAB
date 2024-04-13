import AsyncStorage from '@react-native-async-storage/async-storage';
import {api, updateHeaders} from './src';
import {pages} from '../constants/constants';
import {storeAuthToken} from '../../services/AuthService';
import {useNavigation} from '@react-navigation/native';

export const login = async (username, password) => {
  try {
    const response = await api.post(`/login/`, {
      username: username,
      password: password,
    });

    if (response.status !== 200) {
      throw new Error(response.data.error);
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const handleUnauthorizedAccess = async (error, navigation) => {
    try {
    if (error instanceof InvalidTokenError) {
            const userData = await AsyncStorage.getItem('userData');

      if (userData) {
                const userDataJson = JSON.parse(userData);
        if (userDataJson.username) {
          const response = await login(
            userDataJson.username,
            userDataJson.password,
          );
          
          if (response.session_id) {
            await storeAuthToken(response.session_id);
            updateHeaders('session_id', response.session_id);
            navigation.replace(pages.main);
            return;
          }
        }
      }
      
            navigation.replace(pages.login);
    } else {
            console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error:', error);
    navigation.replace(pages.login);
  }
};

export class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
