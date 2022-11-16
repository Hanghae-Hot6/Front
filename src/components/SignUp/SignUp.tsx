import NavigationButton from '../../common/NavigationButton';
import useSignUpForm from './useSignUpForm';
import styled from 'styled-components';
import {
  closeGlobalModal,
  modalReducer,
  openGlobalModal,
} from '../../Redux/modules/slices/modalSlice';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {useDispatch} from 'react-redux';

function SignUp() {
  const isSignUp = true;
  const dispatch = useAppDispatch();

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
        <StLogoDiv>ODOK</StLogoDiv>
        <StInputItemsDiv>
          <label htmlFor="id">아이디</label>
          <div>
            <StInput
              id="id"
              type="text"
              name="memberId"
              onChange={handleChange}
              value={values.memberId}
            />
            <span>{errors.memberId}</span>

            <button onClick={IdCheckHandler} type="button">
              중복확인
            </button>
          </div>
        </StInputItemsDiv>
        <StInputItemsDiv>
          <label htmlFor="email">E-mail</label>
          <div>
            <StInput
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <span>{errors.email}</span>
          </div>
        </StInputItemsDiv>
        <StInputItemsDiv>
          <label htmlFor="username">닉네임</label>
          <div>
            <StInput
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
            />
            <span>{errors.username}</span>
          </div>
        </StInputItemsDiv>
        <StInputItemsDiv>
          <label htmlFor="address">주소</label>
          <div>
            <StInput
              id="address"
              type="address"
              name="address"
              onChange={handleChange}
              value={values.address}
            />
            <span>{errors.address}</span>
          </div>
        </StInputItemsDiv>
        <StInputItemsDiv>
          <label htmlFor="phoneNumber">전화번호</label>
          <div>
            <StInput
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              onChange={handleChange}
              value={values.phoneNumber}
            />
            <span>{errors.phoneNumber}</span>
          </div>
        </StInputItemsDiv>
        <StInputItemsDiv>
          <label htmlFor="password">비밀번호</label>
          <div>
            <StInput
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            <span>{errors.password}</span>
          </div>
        </StInputItemsDiv>
        <StInputItemsDiv>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <div>
            <StInput
              id="passwordCheck"
              type="password"
              name="passwordCheck"
              value={values.passwordCheck}
              onChange={handleChange}
            />
            <span>{errors.passwordCheck}</span>
          </div>
          <button type="submit">가입완료</button>
          <NavigationButton path="/login" type="button">
            로그인
          </NavigationButton>
          <button
            type="button"
            onClick={() => {
              dispatch(openGlobalModal('signUpAlert'));
            }}>
            open
          </button>
          <br />
        </StInputItemsDiv>
      </StForm>
      <GlobalModal id="SignUpComplete" type="alertModal" confirmPath="/login">
        회원가입 완료되었습니다.
      </GlobalModal>
      <GlobalModal id="idDoubleCheck" type="alertModal">
        중복확인 완료!
      </GlobalModal>
    </StContainer>
  );
}

export default SignUp;

const StContainer = styled.div``;
const StLogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 201px;
  height: 77px;
  margin: 0 auto;
  margin-top: 2.8rem;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 953px;
  width: 496px;
  margin: 0 auto;
  border: 1px solid #c1a4ff;
  padding: 4.8rem;
`;

const StInputItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const StInput = styled.input`
  border: 0;
  outline: none;
`;
