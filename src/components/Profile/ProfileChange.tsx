import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import RegistStInput from '../Elem/RegistStInput';
import eyeImg from '../../assets/eye.svg';
import {useAppDispatch} from '../../Redux/store/store';
import {
  closeGlobalModal,
  openGlobalModal,
} from '../../Redux/modules/slices/modalSlice';
import {memberApis} from '../../api/axiosConfig';
import {useMutation} from 'react-query';
import {ErrorsValue, SignValueType} from '../../types/regist';
import {profileValidate} from './ProfileValidate';
import {CheckPasswordModalProps} from '../../types/profile';
import * as P from './Profile.style';

function ProfileChange({setIsPWCorrect, isPWCorrect}: CheckPasswordModalProps) {
  const initialValues = {
    password: '',
    passwordCheck: '',
    address: '',
    phoneNumber: '',
  };
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<SignValueType>(initialValues);
  const [errors, setErrors] = useState<ErrorsValue>({});

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

  const {mutate: chageProfileMutate} = useMutation(
    async (values: SignValueType) => {
      try {
        const response = await memberApis.modifyProfile(values);
        return response;
      } catch (error) {}
    },
    {
      onSuccess: data => {
        if (data?.status === 200 && data.data.success === true) {
          dispatch(closeGlobalModal('profileChange'));
          dispatch(openGlobalModal('successChangeProfile'));
        } else {
          dispatch(closeGlobalModal('profileChange'));
        }
      },
      onError: error => {
        throw error;
      },
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setValues({...values, [name]: value});
    setErrors(profileValidate({...values}));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values?.password?.trim() === '') {
      return setErrors({
        ...errors,
        password: '비밀번호가 입력되지 않았습니다.',
      });
    }
    chageProfileMutate(values);
    setValues(initialValues);
  };

  useEffect(() => {
    setErrors(profileValidate({...values}));
    return () => {};
  }, [values]);

  return (
    <P.StProfileChangeForm onSubmit={handleSubmit}>
      <div className="inputsDiv">
        <h2>개인정보 수정</h2>
        <RegistStInput
          label="비밀번호"
          id="password"
          name="password"
          type={passwordType.type}
          height="3.3rem"
          mgt="1rem"
          value={values.password}
          onChange={handleChange}>
          <img
            src={eyeImg}
            alt="password 보이기"
            id="password"
            onClick={handlePasswordType}
          />
        </RegistStInput>
        <RegistErrorSpan>{errors.password}</RegistErrorSpan>
        <RegistStInput
          label="비밀번호 확인"
          id="passwordCheck"
          name="passwordCheck"
          type={passwordCheckType.type}
          height="3.3rem"
          mgt="1rem"
          value={values.passwordCheck}
          onChange={handleChange}>
          <img
            src={eyeImg}
            alt="password 보이기"
            id="passwordCheck"
            onClick={handlePasswordType}
          />
        </RegistStInput>
        <RegistErrorSpan>{errors.passwordCheck}</RegistErrorSpan>
        <RegistStInput
          label="주소"
          id="address"
          type="address"
          name="address"
          height="3.3rem"
          mgt="1rem"
          value={values.address}
          onChange={handleChange}></RegistStInput>
        <RegistErrorSpan>{errors.address}</RegistErrorSpan>
        <RegistStInput
          label="전화번호"
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          height="3.3rem"
          mgt="1rem"
          value={values.phoneNumber}
          onChange={handleChange}></RegistStInput>
        <RegistErrorSpan>{errors.phoneNumber}</RegistErrorSpan>
      </div>
      <P.ProcessDiv isPWCorrect={isPWCorrect}>
        <span></span>
        <span></span>
      </P.ProcessDiv>
      <P.BtnBox>
        <button type="submit">변경</button>
        <button
          type="button"
          onClick={() => {
            setIsPWCorrect(false);
            dispatch(closeGlobalModal('profileChange'));
          }}>
          취소
        </button>
      </P.BtnBox>
    </P.StProfileChangeForm>
  );
}

export default ProfileChange;
