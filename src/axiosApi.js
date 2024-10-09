import axios from 'axios';
import { apiUrl } from './constants';

export const addInterceptors = (store) => {
  axiosApi.interceptors.request.use((config) => {
    const { url } = config;
    const isSignIn = url?.includes('/token');
    if (!isSignIn) {
      const token = store.getState().userState.user.access;
      const headers = config.headers;
      console.log(token);
      headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  });
};

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;
