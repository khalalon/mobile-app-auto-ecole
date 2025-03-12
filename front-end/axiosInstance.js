// axiosInstance.js
import axios from 'axios';

// Set up the base URL for your API
const axiosInstance = axios.create
  ({
    baseURL: '192.168.1.67:5000', // Add protocol  timeout: 5000, 
});

export default axiosInstance;
