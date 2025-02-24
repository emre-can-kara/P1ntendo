import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

// Check for token on instance creation
const token = localStorage.getItem('token')
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = token
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
      console.log('Request with token:', token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    if (response.data.token) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = token;
    }
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    return Promise.reject(error);
  }
);

export default axiosInstance 