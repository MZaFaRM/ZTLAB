import {api} from './src';

export const getUserInfo = async () => {
  const response = await api.get(`/get-details/`);

  if (response.status !== 200) {
    throw new Error('Failed to get user info');
  } else {
    return response.data;
  }
};

export const getSidebarUserInfo = async () => {
  const response = await api.get(`/get-sidebar/`);

  if (response.status !== 200) {
    throw new Error('Failed to get user info');
  } else {
    return response.data;
  }
}