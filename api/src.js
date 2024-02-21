import axios from 'axios';

// Create a custom Axios instance with default headers
const api = axios.create({
  baseURL: 'https://webscrapper-r78p.onrender.com', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const updateHeaders = (headerName, headerValue) => {
  api.defaults.headers.common[headerName] = headerValue;
};

export {api, updateHeaders};
