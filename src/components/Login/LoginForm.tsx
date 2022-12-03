import React, {useEffect, useState} from 'react';
import useSignUpForm from '../SignUp/useSignUpForm';
import {getAccessToken, getUserId} from '../../utils';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import eyeImg from '../../assets/eye.svg';
import kako_comment_img from '../../assets/kako_comment_img.svg';

import {useQuery} from 'react-query';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import {memberApis} from '../../api/axiosConfig';
import LoginModalCollection from './LoginModalCollection';
import * as L from './Login.style';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSignUp = false;
  const accessToken = getAccessToken();
  const userId = getUserId();

  console.log(`${process.env.REACT_APP_BASE_URL}`);

  // 비밀번호 보이기, 숨기기
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const DEPLOY_REDIRECT_URI = `${process.env.REACT_APP_DEPLOY_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${DEPLOY_REDIRECT_URI}&response_type=code`;

  const kakaoCode = location.search.split('=')[1];

  const {values, errors, submitting, handleChange, handleSubmit} =
    useSignUpForm(
      {
        memberId: '',
        password: '',
      },
      isSignUp,
    );

  const {data, isLoading, error} = useQuery(
    ['kakaoAuth', kakaoCode],
    async ({queryKey}) => await memberApis.kakaoLogin(queryKey[1]),

    {
      retry: 0,
      enabled: !!kakaoCode,

      onSuccess: data => {
        localStorage.setItem('userId', data.data.data);
        dispatch(openGlobalModal('loginComplete'));
      },

      onError: (error: any) => {
        console.log('error response', error.response);
      },
    },
  );

  useEffect(() => {
    // accessToken을 deps에서 제외시켜줘야 제대로 작동함
    //accessToken이 있는지 없는지는 컴포넌트가 렌더링 될 때 한번만 판별하면 되는데, deps에 access토큰이 있으면 로그인 로그아웃 할 시 매번 useEffect를 실행시키기 때문에 매번 loggingIn 모달을 dispatch
    if (accessToken) {
      dispatch(openGlobalModal('loggingIn'));
    }
  }, [dispatch]);

  const handlePasswordType = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return {type: 'text', visible: true};
      }
      return {type: 'password', visible: false};
    });
  };

  return (
    <div>
      <RegistStForm
        onSubmit={handleSubmit}
        title="로그인"
        height="83rem"
        width="49.2rem">
        <RegistStInput
          id="id"
          type="text"
          name="memberId"
          onChange={handleChange}
          value={values.memberId}
          label="아이디"></RegistStInput>
        <RegistErrorSpan>{errors.memberId}</RegistErrorSpan>

        <RegistStInput
          id="password"
          type={passwordType.type}
          name="password"
          onChange={handleChange}
          value={values.password}
          label="비밀번호">
          <img src={eyeImg} alt="" onClick={handlePasswordType} />
        </RegistStInput>
        <RegistErrorSpan>{errors.password}</RegistErrorSpan>

        <L.ButtonContainer>
          <L.StNavBtn
            type="submit"
            bgColor="#5200FF"
            fontC="white"
            disabled={!values ? true : false}>
            로그인
          </L.StNavBtn>
          <div style={{width: '100%', margin: '0 auto'}}>
            <L.StLoginDivier>또는</L.StLoginDivier>
          </div>
          <a href={KAKAO_AUTH_URL}>
            <L.StNavBtn type="button" bgColor="#FFE600" fontC="#493236">
              <img src={kako_comment_img} alt="" />
              카카오로 로그인
            </L.StNavBtn>
          </a>
          <L.StSmallBtnContainer>
            <L.StSmallNavBtn
              type="button"
              onClick={() => navigate('/login/find-id')}>
              아이디 찾기
            </L.StSmallNavBtn>
            <L.StSmallNavBtn
              type="button"
              onClick={() => navigate('/login/find-password')}>
              비밀번호 찾기
            </L.StSmallNavBtn>
            <L.StSmallNavBtn type="button" onClick={() => navigate('/sign')}>
              회원가입
            </L.StSmallNavBtn>
          </L.StSmallBtnContainer>
        </L.ButtonContainer>
        <LoginModalCollection />
      </RegistStForm>
    </div>
  );
}

export default LoginForm;
