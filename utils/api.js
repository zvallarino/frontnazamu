import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  // Remove this line
  // withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;