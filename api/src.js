import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'https://webscrapper-r78p.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const updateHeaders = (headerName, headerValue) => {
  api.defaults.headers.common[headerName] = headerValue;
};

export {api, updateHeaders};
