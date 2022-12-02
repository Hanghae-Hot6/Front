import useSignUpForm from './useSignUpForm';
import eyeImg from '../../assets/eye.svg';
import {closeGlobalModal} from '../../Redux/modules/slices/modalSlice';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {useNavigate} from 'react-router-dom';
import RegistStInput from '../Elem/RegistStInput';
import RegistStForm from '../Elem/RegistStForm';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import {useState} from 'react';
import SignUpModalCollection from './SignUpModalCollection';
import Timer from '../Login/Timer';
import React, {useRef} from 'react';
import * as S from './SignUp.style';
import {CertNumValuesType} from '../../types/regist';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSignUp = true;
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  const certNumInit = {
    certNumber0: '',
    certNumber1: '',
    certNumber2: '',
    certNumber3: '',
    certNumber4: '',
    certNumber5: '',
    certNumber6: '',
    certNumber7: '',
  };

  // 인증번호 모달
  const [certNumValue, setCertNumValue] =
    useState<CertNumValuesType>(certNumInit);

  // 비밀번호 보이기, 숨기기
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });
  const [passwordCheckType, setPasswordCheckType] = useState({
    type: 'password',
    visible: false,
  });

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

  const inputRef = useRef<null[] | HTMLInputElement[]>([]);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const {name, value} = e.currentTarget;
    setCertNumValue({...certNumValue, [name]: value});

    if (value.length >= 1) {
      inputRef.current[idx]!.className = 'On';
    } else {
      inputRef.current[idx]!.className = 'certNumInput';
    }
    if (idx + 1 === 8) {
      inputRef.current[idx]!.focus();
    } else {
      inputRef.current[idx + 1]!.focus();
    }
  };

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
      <SignUpModalCollection />
      {isGlobalModalOpen && dispatchId === 'emailCheck' && (
        <GlobalModal id="emailCheck" size="lg">
          <S.StModalDiv>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                return emailModalCheckHandler(certNumValue);
              }}>
              <div>
                <h1>이메일 인증</h1>
                <span>메일로 전송된 인증번호를 입력해주세요.</span>

                <Timer initMin={5} initSec={0} />

                <S.StInputBox>
                  <input
                    type="text"
                    name="certNumber0"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[0] = elem)}
                    onChange={e => {
                      handleFocus(e, 0);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber1"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[1] = elem)}
                    onChange={e => {
                      handleFocus(e, 1);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber2"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[2] = elem)}
                    onChange={e => {
                      handleFocus(e, 2);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber3"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[3] = elem)}
                    onChange={e => {
                      handleFocus(e, 3);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber4"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[4] = elem)}
                    onChange={e => {
                      handleFocus(e, 4);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber5"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[5] = elem)}
                    onChange={e => {
                      handleFocus(e, 5);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber6"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[6] = elem)}
                    onChange={e => {
                      handleFocus(e, 6);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber7"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[7] = elem)}
                    onChange={e => {
                      handleFocus(e, 7);
                    }}
                  />
                </S.StInputBox>
              </div>
              <div>
                <button type="submit">확인</button>
                <button
                  type="button"
                  onClick={() => {
                    setCertNumValue(certNumInit);
                    dispatch(closeGlobalModal('emailCheck'));
                  }}>
                  취소
                </button>
              </div>
            </form>
          </S.StModalDiv>
        </GlobalModal>
      )}
    </S.StContainer>
  );
}

export default SignUp;
