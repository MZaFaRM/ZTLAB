import axios from 'axios';

const api = axios.create({
  baseURL: 'https://webscrapper-r78p.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const updateHeaders = (headerName, headerValue) => {
  console.log("Updated headers", headerName, headerValue);
  api.defaults.headers.common[headerName] = headerValue;
};

export {api, updateHeaders};
