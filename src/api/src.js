import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ae2a-2405-201-f021-1013-81b2-6d0d-4ea9-fc8d.ngrok-free.app',
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
