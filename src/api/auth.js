import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from './src';
import urlPatterns from './urls';
import {getName} from './helper';

export const login = async (username, password) => {
   api.get
}


export const handleUnauthorizedAccess = (error, navigation) => {
  if (error instanceof InvalidTokenError) {
    navigation.replace('Login');
  } else {
    console.error('Error:', error);
  }
};

export class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
