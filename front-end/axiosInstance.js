// axiosInstance.js
import axios from 'axios';

// Set up the base URL for your API
const axiosInstance = axios.create
  ({
    baseURL: 'x', // Add protocol  timeout: 5000, 
});

export default axiosInstance;
