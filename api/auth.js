import {api} from './src';

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
