import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import RegistStInput from '../Elem/RegistStInput';
import eyeImg from '../../assets/eye.svg';
import {useAppDispatch} from '../../Redux/store/store';
import {closeGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {memberApis} from '../../api/axiosConfig';
import {useMutation} from 'react-query';
import {ErrorsValue, SignValueType} from '../../types/regist';
import {profileValidate} from './ProfileValidate';

function ProfileChange() {
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
    async () => {
      try {
        // const response = await memberApis.
      } catch (error) {}
    },
    {
      onSuccess: data => {},
      onError: error => {},
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setValues({...values, [name]: value});
    setErrors(profileValidate({...values}));
    console.log(errors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues(initialValues);
  };
  return (
    <StProfileChangeForm onSubmit={handleSubmit}>
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
      <BtnBox>
        <button type="submit">변경</button>
        <button
          type="button"
          onClick={() => dispatch(closeGlobalModal('profileChange'))}>
          취소
        </button>
      </BtnBox>
    </StProfileChangeForm>
  );
}

export default ProfileChange;

const StProfileChangeForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: space-between;

  .inputsDiv {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    h2 {
      font-size: 1.8rem;
      font-weight: bold;
    }
    input {
      font-size: 1.5rem;
    }
    label {
      font-size: 1.5rem;
      white-space: nowrap;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 50%;
    background-color: #fff;
    color: ${props => props.theme.MainColor};
    border: 1px solid ${props => props.theme.MainColor};
    padding: 0;
  }
`;
