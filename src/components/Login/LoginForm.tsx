import React, {useEffect, useState} from 'react';
import useSignUpForm from '../SignUp/useSignUpForm';
import {getAccessToken, getUserId} from '../../utils';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import NavigationButton from '../../common/NavigationButton';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSignUp = false;
  const accessToken = getAccessToken();
  const userId = getUserId();
  const {values, errors, submitting, handleChange, handleSubmit} =
    useSignUpForm(
      {
        memberId: '',
        password: '',
      },
      isSignUp,
    );

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      dispatch(openGlobalModal('LoggingIn'));
      // alert('로그인상태 입니다');
      // navigate('/');
    }
  }, [accessToken, navigate, dispatch]);

  return (
    <div>
      <StForm onSubmit={handleSubmit}>
        <StLogoDiv>ODOK</StLogoDiv>
        <label htmlFor="id">아이디</label>
        <StInput
          id="id"
          type="text"
          name="memberId"
          onChange={handleChange}
          value={values.memberId}
        />
        <span>{errors.memberId}</span>
        <br />
        <label htmlFor="password">비밀번호</label>
        <StInput
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
        <span>{errors.password}</span>
        <br />
        <button type="submit">로그인</button>
        <div style={{width: '100%', margin: '0 auto'}}>
          <StLoginDivier>또는</StLoginDivier>
        </div>
        <button type="button">카카오로 로그인</button>
        <div>
          <button type="button">아이디 찾기</button>
          <button type="button">비밀번호 찾기</button>
          <NavigationButton type="button" path={'/sign'}>
            회원가입
          </NavigationButton>
        </div>
      </StForm>
      <GlobalModal id="LoginComplete" type="alertModal" confirmPath="/">
        로그인 되었습니다
      </GlobalModal>
      <GlobalModal id="LoggingIn" type="alertModal" confirmPath="/">
        로그인 되었습니다
      </GlobalModal>
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
  justify-content: center;
  align-items: center;
  width: 20.1rem;
  height: 7.7rem;
  margin: 0 auto;
  margin-top: 2.8rem;
`;

const StLoginDivier = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin: 0 0;
  font-size: 1.8rem;
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
const StInput = styled.input`
  border: 0;
  outline: none;
`;
