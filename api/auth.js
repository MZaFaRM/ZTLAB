import {api, updateHeaders} from './src';

export const login = async (username, password) => {
  try {
    const response = await api.post(`/login/`, {
      username: username,
      password: password,
    });

    if (response.status !== 200) {
      throw new Error('Login failed');
    } else {
      updateHeaders('session_id', response.data.data.session_id);
      return true;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


