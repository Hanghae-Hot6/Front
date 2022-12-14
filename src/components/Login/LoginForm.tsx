// Libraries(react관련 패키지, 그외 라이브러리)
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../Redux/store/store';

//components
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import LoginModalCollection from './LoginModalCollection';

// 그외 (img, css, fn, params...)
import useSignUpForm from '../SignUp/useSignUpForm';
import {memberApis} from '../../api/axiosConfig';
import {getAccessToken, getUserId} from '../../utils';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import * as L from './Login.style';
import eyeImg from '../../assets/eye.svg';
import kako_comment_img from '../../assets/kako_comment_img.svg';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSignUp = false;
  const accessToken = getAccessToken();
  const userId = getUserId();

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
        localStorage.setItem('userId', JSON.stringify(data.data.data));
        dispatch(openGlobalModal('loginComplete'));
      },

      onError: (error: any) => {},
    },
  );

  useEffect(() => {
    if (accessToken) {
      if (accessToken.split(' ')[0] !== 'Bearer') {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('userId');
        localStorage.removeItem('Refresh-Token');
        return;
      } else {
        dispatch(openGlobalModal('loggingIn'));
      }
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
