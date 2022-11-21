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

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
  const isSignUp = true;

  // 인증번호 모달
  const [certNumValue, setCertNumValue] = useState('');

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

  return (
    <StContainer>
      <RegistStForm
        onSubmit={handleSubmit}
        title="간편하게 회원가입"
        height="102rem"
        width="49.2rem">
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

        <RegistStInput
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
        <RegistErrorSpan>{errors.phoneNumber}</RegistErrorSpan>

        <RegistStInput
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          label="E-mail">
          <StCheckBtn
            type="button"
            onClick={() => {
              certEmailHandler();
            }}>
            이메일 인증
          </StCheckBtn>
        </RegistStInput>
        <RegistErrorSpan>{errors.email}</RegistErrorSpan>

        <RegistStInput
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={values.username}
          label="실명"></RegistStInput>
        <RegistErrorSpan>{errors.username}</RegistErrorSpan>

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
        <GlobalModal id="emailCheck">
          <StModalDiv>
            <span>이메일 인증번호를 입력해주세요...!</span>
            <Timer initMin={2} initSec={0} />
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                return emailModalCheckHandler(certNumValue);
              }}>
              <input
                type="text"
                name="certNumber"
                value={certNumValue}
                onChange={e => {
                  const {value} = e.currentTarget;
                  const validateValue = value.trim();
                  setCertNumValue(validateValue);
                }}
              />
              <button type="submit">확인</button>
              <button
                type="button"
                onClick={() => {
                  setCertNumValue('');
                  dispatch(closeGlobalModal('emailCheck'));
                }}>
                취소
              </button>
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
  font-size: 1.4rem;
  height: 2.3rem;
  color: #5200ff;
  /* border: 1px solid #5200ff; */
  border: 1px solid
    ${(props: {theme: {MainColor: any}}) => props.theme.MainColor};
  border-radius: 20px;
  background-color: white;
  position: absolute;
  right: 0;
  text-align: center;
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
  flex-direction: column;
  span {
    margin-bottom: 2rem;
  }
`;
