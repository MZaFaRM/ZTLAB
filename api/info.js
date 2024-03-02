import {api} from './src';
import {InvalidTokenError} from './auth';

const fetchData = async endpoint => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new InvalidTokenError('Invalid token');
    } else {
      throw new Error(`Failed to fetch data: ${error.response.data.error}`);
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
