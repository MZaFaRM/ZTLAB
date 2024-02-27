import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAuthToken = async token => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing authentication token:', error);
  }
};

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error retrieving authentication token:', error);
    return null;
  }
};

const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing authentication token:', error);
  }
};

export {storeAuthToken, getAuthToken, removeAuthToken};
