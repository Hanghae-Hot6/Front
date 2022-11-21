import axios, {AxiosRequestConfig} from 'axios';
import {SignValueType} from '../types/regist';
import {getAccessToken} from '../utils';

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: '',
  },
};

const api = axios.create(config);

api.interceptors.request.use(function (config) {
  const accessToken = getAccessToken();

  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = accessToken;
  return config;
});

export const memberApis = {
  // 회원가입
  signUp: async (payload: SignValueType) =>
    await api.post(`${process.env.REACT_APP_BASE_URL}/members/signup`, payload),
  // 로그인
  login: async (payload: SignValueType) =>
    await api.post(`${process.env.REACT_APP_BASE_URL}/members/login`, payload),

  //id 중복검사
  idCheck: async (payload: string | undefined) =>
    await api.get(
      `${process.env.REACT_APP_BASE_URL}/members/signup/checkid/${payload}`,
    ),
  // email 전송
  sendEmail: async (payload: string | undefined) =>
    await api.get(
      `${process.env.REACT_APP_BASE_URL}/members/mailConfirm?email=${payload}`,
    ),
  // 인증번호 전송
  sendCertNum: async (payload: string | undefined) =>
    await api.get(
      `${process.env.REACT_APP_BASE_URL}/members/mailAuth?code=${payload}`,
    ),
};
