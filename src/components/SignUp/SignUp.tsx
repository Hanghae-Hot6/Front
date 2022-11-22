import NavigationButton from '../../common/NavigationButton';
import useSignUpForm from './useSignUpForm';
import styled from 'styled-components';
import eyeImg from '../../assets/eye.svg';
import {
  closeGlobalModal,
  openGlobalModal,
} from '../../Redux/modules/slices/modalSlice';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {useNavigate} from 'react-router-dom';
import RegistStInput from '../Elem/RegistStInput';
import RegistStForm from '../Elem/RegistStForm';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import {useState} from 'react';
import SignUpModalCollection from './SignUpModalCollection';
import Timer from '../Login/Timer';
import React, {useRef, useEffect} from 'react';
import {cursorTo} from 'readline';

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
  const [certNumValue, setCertNumValue] = useState(certNumInit);

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

  useEffect(() => {});

  return (
    <StContainer>
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
          <StCheckBtn onClick={IdCheckHandler} type="button">
            중복확인
          </StCheckBtn>
        </RegistStInput>
        <RegistErrorSpan>{errors.memberId || errors.idCheck}</RegistErrorSpan>

        <RegistStInput
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          maxLength={20}
          label="E-mail">
          <StCheckBtn
            type="button"
            onClick={() => {
              certEmailHandler();
            }}>
            이메일 인증
          </StCheckBtn>
        </RegistStInput>
        <RegistErrorSpan>{errors.email || errors.emailCheck}</RegistErrorSpan>

        <RegistStInput
          id="password"
          type={passwordType.type}
          name="password"
          onChange={handleChange}
          value={values.password}
          label="비밀번호">
          <img src={eyeImg} alt="" id="password" onClick={handlePasswordType} />
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
            alt=""
            id="passwordCheck"
            onClick={handlePasswordType}
          />
        </RegistStInput>
        <RegistErrorSpan>{errors.passwordCheck}</RegistErrorSpan>

        {/* <RegistStInput
          id="address"
          type="address"
          name="address"
          onChange={handleChange}
          value={values.address}
          label="주소"></RegistStInput>
        <RegistErrorSpan>{errors.address}</RegistErrorSpan>

        <RegistStInput
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          onChange={handleChange}
          value={values.phoneNumber}
          label="전화번호"></RegistStInput>
        <RegistErrorSpan>{errors.phoneNumber}</RegistErrorSpan> */}

        <ButtonContainer>
          <StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            가입완료
          </StNavBtn>
          <StNavBtn
            type="button"
            bgColor="#5200FF"
            fontC="white"
            onClick={() => {
              navigate('/login');
            }}>
            로그인
          </StNavBtn>
        </ButtonContainer>
      </RegistStForm>
      <SignUpModalCollection />
      {isGlobalModalOpen && dispatchId === 'emailCheck' && (
        <GlobalModal id="emailCheck" size="lg">
          <StModalDiv>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                return emailModalCheckHandler(certNumValue);
              }}>
              <div>
                <h1>이메일 인증</h1>
                <span>메일로 전송된 인증번호를 입력해주세요.</span>

                <Timer initMin={5} initSec={0} />

                {/* <input
                  type="text"
                  name="certNumber"
                  value={certNumValue}
                  onChange={e => {
                    const {value} = e.currentTarget;
                    const validateValue = value.trim();
                    setCertNumValue(validateValue);
                  }}
                /> */}
                <StInputBox>
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
                </StInputBox>
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
          </StModalDiv>
        </GlobalModal>
      )}
    </StContainer>
  );
}

export default SignUp;

const StContainer = styled.div``;

const StCheckBtn = styled.button`
  display: flex;
  font-size: 1.4rem;
  height: 2.3rem;
  color: #5200ff;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 20px;
  background-color: white;
  position: absolute;
  right: 0;
  text-align: center;
  white-space: nowrap;
`;

const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  width: 40rem;
  height: 6rem;
  color: ${props => props.fontC};
  background-color: ${props => props.theme.MainColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
`;

const StModalDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  span {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    h1 {
      font-size: 2rem;
      font-weight: bold;
    }

    /* input {
      border: 1px solid ${props => props.theme.MainColor};
      height: 3rem;
    }
     */
    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
    }
    div:nth-child(2) {
      display: flex;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;

const StInputBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 3rem;
  padding: 0 7rem;
  input {
    display: flex;
    text-align: center;
    width: 10%;
    height: 100%;
    border: none;
    border-bottom: 1px solid ${props => props.theme.LightGray};
    font-size: 1.8rem;
    font-weight: bold;
    :focus {
      outline: none;
    }
  }

  .On {
    border-bottom: 1px solid ${props => props.theme.MainColor};
  }
`;
