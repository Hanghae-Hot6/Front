import React, {useEffect, useState} from 'react';
import useSignUpForm from '../SignUp/useSignUpForm';
import {getAccessToken, getUserId} from '../../utils';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import NavigationButton from '../../common/NavigationButton';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import eyeImg from '../../assets/eye.svg';
import kako_comment_img from '../../assets/kako_comment_img.svg';

import {useSelector} from 'react-redux';
import {useQuery} from 'react-query';
import axios from 'axios';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';
import RegistErrorSpan from '../Elem/RegistErrorSpan';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSignUp = false;
  const accessToken = getAccessToken();
  const userId = getUserId();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
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
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/kakao?code=${kakaoCode}`,
      );
      localStorage.setItem(
        'Authorization',
        JSON.stringify(response.headers.authorization),
      );
      return response;
    },

    {
      retry: 0,
      enabled: !!kakaoCode,
      onSuccess: data => {
        console.log(data);
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

        <ButtonContainer>
          <StNavBtn
            type="submit"
            bgColor="#5200FF"
            fontC="white"
            disabled={!values ? true : false}>
            로그인
          </StNavBtn>
          <div style={{width: '100%', margin: '0 auto'}}>
            <StLoginDivier>또는</StLoginDivier>
          </div>
          <a href={KAKAO_AUTH_URL}>
            <StNavBtn type="button" bgColor="#FFE600" fontC="#493236">
              <img src={kako_comment_img} alt="" />
              카카오로 로그인
            </StNavBtn>
          </a>
          <StSmallBtnContainer>
            <Link to="/login/find-id">
              <StSmallNavBtn type="button">아이디 찾기</StSmallNavBtn>
            </Link>
            <Link to="/login/find-password">
              <StSmallNavBtn type="button">비밀번호 찾기</StSmallNavBtn>
            </Link>
            <Link to="/sign">
              <StSmallNavBtn type="button">회원가입</StSmallNavBtn>
            </Link>
          </StSmallBtnContainer>
        </ButtonContainer>
      </RegistStForm>

      {isGlobalModalOpen && dispatchId === 'loginComplete' && (
        <GlobalModal id="loginComplete" type="alertModal" confirmPath="/">
          <div>로그인 되었습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'loggingIn' && (
        <GlobalModal id="loggingIn" type="alertModal" confirmPath="/">
          <div>이미 로그인 중 입니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'logIn-401Error' && (
        <GlobalModal id="logIn-401Error" type="alertModal" confirmPath="/login">
          <div>없는 정보입니다. 회원가입 해주세요.</div>
        </GlobalModal>
      )}
    </div>
  );
}

export default LoginForm;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
`;

const StLoginDivier = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin: 0 0;
  font-size: 1.8rem;
  margin-bottom: 4.3rem;
  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 0.1rem;
    font-size: 0;
    line-height: 0;
    margin: 0 1.6rem;
  }
`;

const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  display: flex;
  width: 40rem;
  height: 6rem;
  color: ${({fontC}) => fontC};
  background-color: ${({bgColor}) => bgColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
  align-items: center;
  justify-content: center;

  img {
    transform: scale(0.8);
    margin-right: 1rem;
  }
`;

const StSmallBtnContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StSmallNavBtn = styled.button<{
  fontC?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
}>`
  color: ${({fontC}) => fontC};
  background-color: white;
  color: #767676;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;
  width: 33%;
  justify-content: center;
  align-items: center;
`;
