import React, {useEffect, useState} from 'react';
import useSignUpForm from '../SignUp/useSignUpForm';
import {getAccessToken, getUserId} from '../../utils';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import NavigationButton from '../../common/NavigationButton';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import logo from '../../assets/logo.svg';
import {useSelector} from 'react-redux';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSignUp = false;
  const accessToken = getAccessToken();
  const userId = getUserId();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
  const {values, errors, submitting, handleChange, handleSubmit} =
    useSignUpForm(
      {
        memberId: '',
        password: '',
      },
      isSignUp,
    );

  useEffect(() => {
    // accessToken을 deps에서 제외시켜줘야 제대로 작동함
    //accessToken이 있는지 없는지는 컴포넌트가 렌더링 될 때 한번만 판별하면 되는데, deps에 access토큰이 있으면 로그인 로그아웃 할 시 매번 useEffect를 실행시키기 때문에 매번 loggingIn 모달을 dispatch
    if (accessToken) {
      dispatch(openGlobalModal('loggingIn'));
    }
    return () => {};
  }, [dispatch]);

  return (
    <div>
      <StForm onSubmit={handleSubmit}>
        <StLogoDiv>
          <img src={logo} alt="" />
          <span>로그인</span>
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
        </StInputItemsDiv>

        <StErrorSpan>{errors.memberId}</StErrorSpan>
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

        <ButtonContainer>
          <StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            로그인
          </StNavBtn>
          <div style={{width: '100%', margin: '0 auto'}}>
            <StLoginDivier>또는</StLoginDivier>
          </div>
          <StNavBtn type="button" bgColor="#FFE600" fontC="#493236">
            카카오로 로그인
          </StNavBtn>
          <StSmallBtnContainer>
            <StSmallNavBtn type="button">아이디 찾기</StSmallNavBtn>
            <StSmallNavBtn type="button">비밀번호 찾기</StSmallNavBtn>
            <StSmallNavBtn type="button" path={'/sign'}>
              회원가입
            </StSmallNavBtn>
          </StSmallBtnContainer>
        </ButtonContainer>
      </StForm>
      {isGlobalModalOpen && dispatchId === 'loginComplete' && (
        <GlobalModal id="loginComplete" type="alertModal" confirmPath="/">
          로그인 되었습니다
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'loggingIn' && (
        <GlobalModal id="loggingIn" type="alertModal" confirmPath="/">
          이미 로그인 중 입니다.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'logInError' && (
        <GlobalModal id="logInError" type="alertModal" confirmPath="/login">
          알 수 없는 에러 입니다.
        </GlobalModal>
      )}
    </div>
  );
}

export default LoginForm;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  height: 83rem;
  width: 49.6rem;
  border-radius: 0px;
  margin: 0 auto;
  border: 1px solid #c1a4ff;
  padding: 4.8rem;
`;
const StLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20.1rem;
  height: 7.7rem;
  margin: 0 auto;
  margin-top: 2.8rem;
  margin-bottom: 0.9rem;
  img {
    transform: scale(1);
    margin-bottom: 1.7rem;
  }
  span {
    font-size: 2.8rem;
    font-weight: 700;
  }
`;

const StInputItemsDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5.7rem;
  margin-top: 7.4rem;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
  label {
    width: 7rem;
    font-size: 1.8rem;
    margin-right: 5rem;
  }
`;
const StInput = styled.input`
  border: 0;
  outline: none;
  background-color: white;
  font-size: 2rem;
`;

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

const StNavBtn = styled.button`
  width: 40rem;
  height: 6rem;
  color: ${(props: {fontC: string}) => props.fontC};
  background-color: ${(props: {bgColor: string}) => props.bgColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
`;

const StSmallBtnContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StSmallNavBtn = styled(NavigationButton)`
  color: ${(props: {fontC: string}) => props.fontC};
  background-color: white;
  color: #767676;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;
  width: 33%;
  justify-content: center;
  align-items: center;
`;

const StErrorSpan = styled.span`
  color: #ff0000;
  font-size: 1.4rem;
  margin-top: 0.4rem;
`;
