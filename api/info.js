import {api} from './src';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async () => {
  const response = await api.get(`/get-details/`);

  if (response.status !== 200) {
    throw new Error(`Failed to get user info: ${response.data.error}`);
  } else {
    return response.data;
  }
};

export const getSidebarUserInfo = async () => {
  const response = await api.get(`/get-sidebar/`);

  if (response.status !== 200) {
    throw new Error(`Failed to get user info ${response.data.error}`);
  } else {
    return response.data;
  }
};

export const getAssignmentInfo = async () => {
  const response = await api.get('/get-assignments/');

  if (response.status !== 200) {
    throw new Error(`Failed to get assignment info ${response.data.error}`);
  } else {
    return response.data;
  }
};

export const getSubjectWiseAttendance = async () => {
  const response = await api.get('/get-attendance/');

  if (response.status !== 200) {
    throw new Error(`Failed to get attendance info ${response.data.error}`);
  } else {
    return response.data;
  }
};
