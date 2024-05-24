import axios from 'axios';
import {VITE_API_URL} from '@/config'
import store from '@/utils/storage'

const token = store.getToken()
console.log(token)

const axiosInstance = axios.create({
  baseURL: VITE_API_URL || 'http://localhost:5000', // Adjust the base URL as needed
  headers: {
    "Content-Type": 'application/json',
    Authorization: `Bearer ${token}`,
  },

});

export default axiosInstance;
