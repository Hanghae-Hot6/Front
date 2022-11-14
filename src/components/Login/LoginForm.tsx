import React, {useEffect} from 'react';
import useSignUpForm from '../SignUp/useSignUpForm';
import {getAccessToken, getUserId} from '../../utils';
import {useNavigate} from 'react-router-dom';
function LoginForm() {
  const navigate = useNavigate();
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

      alert('로그인중 입니다');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">
          아이디
          <input
            id="id"
            type="text"
            name="memberId"
            onChange={handleChange}
            value={values.memberId}
          />
        </label>
        <span>{errors.memberId}</span>
        <br />
        <label htmlFor="password">
          비밀번호
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </label>
        <span>{errors.password}</span>
        <br />
        <button>로그인</button>
      </form>
    </div>
  );
}

export default LoginForm;
