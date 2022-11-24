import axios, {AxiosRequestConfig} from 'axios';
import {
  FindIdValue,
  FindPasswordValueType,
  SignValueType,
} from '../types/regist';
import {getAccessToken, getRefreshToken} from '../utils';

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
  const refreshToken = getRefreshToken();
  console.log(accessToken, refreshToken);

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

  // Kakao OAuth
  kakaoLogin: async (payload: string | undefined) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/members/kakao?code=${payload}`,
    );
    localStorage.setItem(
      'Authorization',
      JSON.stringify(response.headers.authorization),
    );
    return response;
  },

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

  // 비밀번호 변경
  changePassword: async (payload: FindPasswordValueType) =>
    await api.post(
      `${process.env.REACT_APP_BASE_URL}/members/findPassword`,
      payload,
    ),

  // 아이디 찾기
  changeMemberId: async (payload: FindIdValue) =>
    await api.post(`${process.env.REACT_APP_BASE_URL}/members/findId`, payload),

  //My page
  myPageInfo: async () =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/members/mypage`),

  // 내가 개설한 클럽 모임
  getLeaderClubs: async () =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/members/mypage/leader`),

  getInterestClubs: async () =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/members/mypage/interest`),
};
