import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.botzinho.com.br',
  headers: {
    Authorization: localStorage.getItem('accessToken')
      ? `Token ${localStorage.getItem('accessToken')}`
      : null,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('accessToken')) {
      config.headers['Authorization'] =
        'Token ' + localStorage.getItem('accessToken');
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
