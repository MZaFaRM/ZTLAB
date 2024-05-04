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
    if (response.status === 200) {
      return response.data.data;
    } else if (response.status === 401) {
      throw new InvalidTokenError(
        response.data?.error || 'Invalid username or password',
      );
    } else {
      throw new Error(response.data?.error || `${response.status} error`);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const handleUnauthorizedAccess = async (error, navigation) => {
  if (error instanceof InvalidTokenError) {
    const userData = await AsyncStorage.getItem('userData');

    if (userData) {
      const userDataJson = JSON.parse(userData);
      if (userDataJson.username) {
        try {
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
        } catch (error) {
          if (error instanceof InvalidTokenError) {
            console.error('Error:', error);
            navigation.replace(pages.login);
            return;
          }
        }
      }
    }
  } else {
    console.error('Error:', error);
    throw error;
  }
};

export class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
