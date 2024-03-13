import {api} from './src';
import {InvalidTokenError} from './auth';
import {updateHeaders} from './src';
import {getAuthToken} from '../services/AuthService';

const fetchData = async endpoint => {
  try {
    const token = await getAuthToken();
    updateHeaders('session_id', token);

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new InvalidTokenError(`Invalid token`);
    } else {
      throw new Error(`Failed to fetch data: ${JSON.stringify(error.response.data)}`);
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
  console.log(`/get-timetable/${day}/`);
  return await fetchData(`/get-timetable/${day}`);
};
