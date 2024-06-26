import {getAuthToken} from '../../services/AuthService';
import {InvalidTokenError} from './auth';
import {api, updateHeaders} from './src';

const fetchData = async endpoint => {
  try {
    const token = await getAuthToken();
    updateHeaders('session_id', token);
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (!error.response?.status) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log('Network Error Retrying...');
      return fetchData(endpoint);
    } else if (error.response.status === 401) {
      throw new InvalidTokenError('Invalid token');
    } else {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
};

export const getUserInfo = async () => {
  return await fetchData(`/get-details/`);
};

export const getSidebarUserInfo = async () => {
  return await fetchData(`/get-sidebar/`);
};

export const getAssignmentInfo = async () => {
  return await fetchData('/get-assignments/');
};

export const getSubjectWiseAttendance = async () => {
  return await fetchData('/get-attendance/');
};

export const getTimeTable = async day => {
  return await fetchData(`/get-timetable/${day}`);
};

export const getSurvey = async () => {
  return await fetchData('/get-surveys/');
};
