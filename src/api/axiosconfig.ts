import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  //   const accessToken = localStorage.getItem('Authorization');
  //   config.headers.Authorization = accessToken;
  return config;
});

export const userApis = {
  //   login: payload => api.post(`/member/login`, payload),
  //   signup: payload => api.post(`/member/signup`, payload),
};
