// Libraries(react관련 패키지, 그외 라이브러리)
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//components
import RegistStInput from '../Elem/RegistStInput';
import RegistStForm from '../Elem/RegistStForm';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import SignUpModalCollection from './SignUpModalCollection';

// 그외 (img, css, fn, params...)
import useSignUpForm from './useSignUpForm';
import eyeImg from '../../assets/eye.svg';
import * as S from './SignUp.style';

function SignUp() {
  const navigate = useNavigate();
  const isSignUp = true;

  // 비밀번호 보이기, 숨기기
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });
  const [passwordCheckType, setPasswordCheckType] = useState({
    type: 'password',
    visible: false,
  });

  // 비밀번호, 비밀번호 확인 숨기기 / 보이기 기능
  const handlePasswordType = (e: React.MouseEvent<HTMLImageElement>) => {
    const {id} = e.currentTarget;
    if (id === 'password') {
      setPasswordType(() => {
        if (!passwordType.visible) {
          return {type: 'text', visible: true};
        }
        return {type: 'password', visible: false};
      });
    } else if (id === 'passwordCheck') {
      setPasswordCheckType(() => {
        if (!passwordCheckType.visible) {
          return {type: 'text', visible: true};
        }
        return {type: 'password', visible: false};
      });
    }
  };

  const {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    IdCheckHandler,
    certEmailHandler,
    emailModalCheckHandler,
  } = useSignUpForm(
    {
      memberId: '',
      email: '',
      username: '',
      address: '',
      phoneNumber: '',
      password: '',
      passwordCheck: '',
    },
    isSignUp,
  );

  return (
    <S.StContainer>
      <RegistStForm
        onSubmit={handleSubmit}
        title="간편하게 회원가입"
        height="83rem"
        width="49.2rem">
        <RegistStInput
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={values.username}
          label="실명"></RegistStInput>
        <RegistErrorSpan>{errors.username}</RegistErrorSpan>

        <RegistStInput
          id="id"
          type="text"
          name="memberId"
          onChange={handleChange}
          value={values.memberId}
          label="아이디">
          <S.StCheckBtn onClick={IdCheckHandler} type="button">
            중복확인
          </S.StCheckBtn>
        </RegistStInput>
        <RegistErrorSpan>{errors.memberId || errors.idCheck}</RegistErrorSpan>

        <RegistStInput
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          maxLength={30}
          label="E-mail">
          <S.StCheckBtn
            type="button"
            onClick={() => {
              certEmailHandler();
            }}>
            이메일 인증
          </S.StCheckBtn>
        </RegistStInput>
        <RegistErrorSpan>{errors.email || errors.emailCheck}</RegistErrorSpan>

        <RegistStInput
          id="password"
          type={passwordType.type}
          name="password"
          onChange={handleChange}
          value={values.password}
          label="비밀번호">
          <img
            src={eyeImg}
            alt="password 보이기"
            id="password"
            onClick={handlePasswordType}
          />
        </RegistStInput>
        <RegistErrorSpan>{errors.password}</RegistErrorSpan>

        <RegistStInput
          id="passwordCheck"
          type={passwordCheckType.type}
          name="passwordCheck"
          onChange={handleChange}
          value={values.passwordCheck}
          label="비밀번호 확인">
          <img
            src={eyeImg}
            alt="password 보이기"
            id="passwordCheck"
            onClick={handlePasswordType}
          />
        </RegistStInput>
        <RegistErrorSpan>{errors.passwordCheck}</RegistErrorSpan>

        <S.ButtonContainer>
          <S.StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            가입완료
          </S.StNavBtn>
          <S.StNavBtn
            type="button"
            bgColor="#5200FF"
            fontC="white"
            onClick={() => {
              navigate('/login');
            }}>
            로그인
          </S.StNavBtn>
        </S.ButtonContainer>
      </RegistStForm>
      <SignUpModalCollection emailModalCheckHandler={emailModalCheckHandler} />
    </S.StContainer>
  );
}

export default SignUp;
