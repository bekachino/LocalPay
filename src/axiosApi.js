import axios from 'axios';
import { apiUrl } from './constants';
import { logout } from "./features/user/userThunk";

export const addInterceptors = (store) => {
  const { dispatch } = store;
  
  axiosApi.interceptors.request.use((config) => {
    const { url } = config;
    const isSignIn = url?.includes('/token');
    if (!isSignIn) {
      const { access } = store.getState().userState.user;
      const headers = config.headers;
      headers.set('Authorization', `Bearer ${access}`);
    }
    return config;
  });
  
  axiosApi.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.status === 401 && error.response.data.code === 'token_not_valid') {
      dispatch(logout());
    }
  });
};

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;
