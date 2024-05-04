import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1dd7-2405-201-f021-1039-5446-eb33-f9c0-c29f.ngrok-free.app',
  // baseURL: 'https://webscrapper-r78p.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const updateHeaders = (headerName, headerValue) => {
  console.log("Updated headers", headerName, headerValue);
  api.defaults.headers.common[headerName] = headerValue;
};

export {api, updateHeaders};
