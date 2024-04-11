import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fd13-2409-40f3-100f-d37c-34f2-e51f-9ae8-73d3.ngrok-free.app',
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
