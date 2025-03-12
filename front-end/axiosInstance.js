// axiosInstance.js
import axios from 'axios';

// Set up the base URL for your API
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.67:5000', // Added the protocol here
  timeout: 5000, 
});

export default axiosInstance;
