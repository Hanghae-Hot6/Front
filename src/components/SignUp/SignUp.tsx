import axios from 'axios';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import NavigationButton from '../../common/NavigationButton';
import useSignUpForm from './useSignUpForm';

type IdDoubleCheckType = {
  result: boolean;
};

function SignUp() {
  const isSignUp = true;
  const {values, errors, submitting, handleChange, handleSubmit} =
    useSignUpForm(
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

  const {
    data: idCheckData,
    isLoading,
    error: idCheckError,
    refetch: idCheckFetch,
  } = useQuery(
    ['IdDoubleCheck', `${values.memberId}`],
    async () => {
      console.log(`${values.memberId}`);
      const {data} = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/idCheck/${values.memberId}`,
      );
      return data;
    },
    // 버튼을 눌렀을 때만 실행할 수 있도록 만들기 위해, 자동 실행 방지 설정
    {
      refetchOnWindowFocus: false,
      enabled: false,
      // 재시도 횟수 1번
      retry: 1,
    },
  );

  const IdDoubleCheckHandler = () => {
    idCheckFetch();
    console.log(idCheckData);
    console.log(idCheckError);
  };
  // const onNameDoubleCheck = () => {};

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
        <button onClick={IdDoubleCheckHandler}>중복확인</button>
        <span>{errors.memberId}</span>
        <br />
        <label htmlFor="email">
          E-mail
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </label>
        <span>{errors.email}</span>
        <br />
        <label htmlFor="username">
          닉네임
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
        </label>
        {/* <button onClick={onNameDoubleCheck}>중복확인</button> */}
        <span>{errors.username}</span>

        <br />
        <label htmlFor="address">
          주소
          <input
            id="address"
            type="address"
            name="address"
            onChange={handleChange}
            value={values.address}
          />
        </label>
        <span>{errors.address}</span>
        <br />
        <label htmlFor="phoneNumber">
          전화번호
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
          />
        </label>
        <span>{errors.phoneNumber}</span>
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
        <label htmlFor="passwordCheck">
          비밀번호 확인
          <input
            id="passwordCheck"
            type="password"
            name="passwordCheck"
            value={values.passwordCheck}
            onChange={handleChange}
          />
        </label>
        <span>{errors.passwordCheck}</span>
        <br />
        <button type="submit">회원가입하기</button>
        {/* <NavigationButton path="/login">회원가입하기</NavigationButton> */}
      </form>
    </div>
  );
}

export default SignUp;
