import NavigationButton from '../../common/NavigationButton';
import useSignUpForm from './useSignUpForm';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';

import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {useNavigate} from 'react-router-dom';

function SignUp() {
  const isSignUp = true;
  const navigate = useNavigate();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  const {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    IdCheckHandler,
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
    <StContainer>
      <StForm onSubmit={handleSubmit}>
        <StLogoDiv>
          <img src={logo} alt="" />
          <span>간편하게 회원가입</span>
        </StLogoDiv>
        <StInputItemsDiv>
          <label htmlFor="id">아이디</label>
          <StInput
            id="id"
            type="text"
            name="memberId"
            onChange={handleChange}
            value={values.memberId}
          />
          <StCheckBtn onClick={IdCheckHandler} type="button">
            중복확인
          </StCheckBtn>
        </StInputItemsDiv>
        <StErrorSpan>{errors.memberId || errors.idCheck}</StErrorSpan>
        <StInputItemsDiv>
          <label htmlFor="password">비밀번호</label>
          <StInput
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </StInputItemsDiv>
        <StErrorSpan>{errors.password}</StErrorSpan>
        <StInputItemsDiv>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <StInput
            id="passwordCheck"
            type="password"
            name="passwordCheck"
            value={values.passwordCheck}
            onChange={handleChange}
          />
        </StInputItemsDiv>
        <StErrorSpan>{errors.passwordCheck}</StErrorSpan>
        <StInputItemsDiv>
          <label htmlFor="address">주소</label>
          <StInput
            id="address"
            type="address"
            name="address"
            onChange={handleChange}
            value={values.address}
          />
        </StInputItemsDiv>
        <StErrorSpan>{errors.address}</StErrorSpan>
        <StInputItemsDiv>
          <label htmlFor="phoneNumber">전화번호</label>
          <StInput
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
          />
        </StInputItemsDiv>
        <StErrorSpan>{errors.phoneNumber}</StErrorSpan>
        <StInputItemsDiv>
          <label htmlFor="email">E-mail</label>
          <StInput
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </StInputItemsDiv>
        <StErrorSpan>{errors.email}</StErrorSpan>
        <StInputItemsDiv>
          <label htmlFor="username">닉네임</label>
          <StInput
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
        </StInputItemsDiv>
        <StErrorSpan>{errors.username}</StErrorSpan>
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
      </StForm>
      {isGlobalModalOpen && dispatchId === 'SignUpComplete' && (
        <GlobalModal id="SignUpComplete" type="alertModal" confirmPath="/login">
          회원가입 완료되었습니다.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'idDoubleCheck' && (
        <GlobalModal id="idDoubleCheck" type="alertModal">
          중복확인 완료!
        </GlobalModal>
      )}
    </StContainer>
  );
}

export default SignUp;

const StContainer = styled.div``;
const StLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20.1rem;
  height: 7.7rem;
  margin: 0 auto;
  margin-top: 2.8rem;

  img {
    transform: scale(1);
    margin-bottom: 1.7rem;
  }
  span {
    font-size: 2.8rem;
    font-weight: 700;
  }
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 102rem;
  width: 49.6rem;
  margin: 0 auto;
  border: 1px solid #c1a4ff;
  padding: 4.8rem;
  background-color: #fff;
`;

const StInputItemsDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5.7rem;
  margin-top: 4.4rem;
  position: relative;
  border-bottom: 1px solid #e0e0e0;

  label {
    width: 12rem;
    font-size: 1.8rem;
  }
`;

const StInput = styled.input`
  display: flex;
  border: 0;
  outline: none;
  background-color: white;
  font-size: 2rem;
`;

const StCheckBtn = styled.button`
  font-size: 1.4rem;
  width: 7.7rem;
  height: 2.7rem;
  color: #5200ff;
  /* border: 1px solid #5200ff; */
  border: 1px solid
    ${(props: {theme: {MainColor: any}}) => props.theme.MainColor};
  border-radius: 20px;
  background-color: white;
  position: absolute;
  right: 0;
`;

const StErrorSpan = styled.span`
  color: #ff0000;
  font-size: 1.4rem;
  margin-top: 0.4rem;
`;
const StNavBtn = styled.button`
  width: 40rem;
  height: 6rem;
  color: ${(props: {fontC: string}) => props.fontC};
  /* background-color: ${(props: {bgColor: string}) => props.bgColor}; */
  background-color: ${(props: {theme: {MainColor: string}}) =>
    props.theme.MainColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
`;
