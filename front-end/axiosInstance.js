// axiosInstance.js
import axios from 'axios';

// Set up the base URL for your API
const axiosInstance = axios.create({
  baseURL: 'https://8hvhwlbw6d.execute-api.us-east-1.amazonaws.com/prod', 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, 
});

export default axiosInstance;
