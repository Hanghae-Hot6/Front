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

//test

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

api.interceptors.response.use(
  res => res,
  async error => {
    const {
      config,
      response: {status},
    } = error;

    if (status === 401) {
      if (error.response.data.code === 'NOT_VALID_TOKEN') {
        const originalRequest = config;
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();

        // token refresh 요청
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/members/reissue`,
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        );
        const {authorization: getNewAccessToken} = response.headers;

        localStorage.setItem(
          'Authorization',
          JSON.stringify(getNewAccessToken),
        );
        const newAccessToken = getNewAccessToken
          ?.substring(0, getNewAccessToken.length - 1)
          .substring(1, getNewAccessToken.length);

        axios.defaults.headers.common['Authorization'] = newAccessToken;
        originalRequest.headers.Authorization = newAccessToken;

        return axios({
          ...originalRequest,
          headers: originalRequest.headers.toJSON(),
        });
      }
    }
    return Promise.reject(error);
  },
);

export const memberApis = {
  // 회원가입
  signUp: async (payload: SignValueType) =>
    await api.post(`members/signup`, payload),

  // 로그인
  login: async (payload: SignValueType) =>
    await api.post(`members/login`, payload),

  // Kakao OAuth
  kakaoLogin: async (payload: string | undefined) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/members/kakao?code=${payload}`,
    );
    localStorage.setItem(
      'Authorization',
      JSON.stringify(response.headers.authorization),
    );
    localStorage.setItem(
      'Refresh-Token',
      JSON.stringify(response.headers['refresh-token']),
    );
    return response;
  },

  //id 중복검사
  idCheck: async (payload: string | undefined) =>
    await api.get(`members/signup/checkid/${payload}`),

  // email 전송
  sendEmail: async (payload: string | undefined) =>
    await api.get(`mail/confirm?email=${payload}`),

  // 인증번호 전송
  sendCertNum: async (payload: string | undefined) =>
    await api.get(`mail/auth?code=${payload}`),

  // 비밀번호 찾기
  changePassword: async (payload: FindPasswordValueType) =>
    await api.post(`mail/findPassword`, payload),

  // 아이디 찾기
  changeMemberId: async (payload: FindIdValue) =>
    await api.post(`mail/findId`, payload),

  postInquiryEmail: async (payload: string) =>
    await api.post(`mail/cs`, payload, {
      headers: {'Content-Type': 'text/plain'},
    }),

  passwordCheck: async (payload: string) => {
    console.log(payload);

    return await api.post(`members/auth`, payload, {
      headers: {'Content-Type': 'text/plain'},
    });
  },

  // My page
  myPageInfo: async () => await api.get(`mypage`),

  // 내가 개설한 클럽 모임
  getLeaderClubs: async () => await api.get(`mypage/leader`),

  getInterestClubs: async () => await api.get(`mypage/interest`),

  modifyProfile: async (payload: SignValueType) =>
    await api.post(`mypage/modify`, payload),
};

// export const myPageAips = {
//   //My page
//   myPageInfo: async () => await api.get(`mypage`),

//   // 내가 개설한 클럽 모임
//   getLeaderClubs: async () => await api.get(`mypage/leader`),

//   getInterestClubs: async () => await api.get(`mypage/interest`),
// };

// 클럽 관련된 api 모음 클럽 만들기는 제외

export const clubApis = {
  getClubsTop5: async () =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/clubs/top5`),

  getClubDetail: async (payload: string | undefined) =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/clubs/${payload}`),

  deleteClub: async (payload: number | undefined) =>
    await api.delete(`${process.env.REACT_APP_BASE_URL}/clubs/${payload}`),

  joinClub: async (payload: string | undefined) =>
    await api.post(`${process.env.REACT_APP_BASE_URL}/clubs/${payload}/join`),

  interestClub: async (payload: string | undefined) =>
    await api.post(
      `${process.env.REACT_APP_BASE_URL}/clubs/${payload}/interest`,
    ),
  delClub: async (payload: string | undefined) =>
    await api.delete(
      `${process.env.REACT_APP_BASE_URL}/clubs/${payload}/withdraw`,
    ),
  getClubs: async () =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/clubs`),
};

export const reviewApis = {
  getReview: async (payload: string | undefined) =>
    await api.get(
      `${process.env.REACT_APP_BASE_URL}/clubs/${payload}/reviews/getall`,
    ),
  createReview: async (id: string | undefined, input: string) =>
    await api.post(
      `${process.env.REACT_APP_BASE_URL}/clubs/${id}/reviews/create`,
      input,
    ),
  deleteReview: async (reviewId: number | undefined) =>
    await api.delete(
      `${process.env.REACT_APP_BASE_URL}/clubs/${reviewId}/delete`,
    ),
  getAllReview: async () =>
    await api.get(`${process.env.REACT_APP_BASE_URL}/clubs/reviews`),
};

// 채팅
export const chatApis = {
  getAllChatRoomMessages: async (chatRoomId: string) => {
    return await api.get(
      `${process.env.REACT_APP_BASE_URL}/chat/messages/${chatRoomId}`,
    );
  },
};
