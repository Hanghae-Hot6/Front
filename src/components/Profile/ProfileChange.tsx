import React, {useState} from 'react';
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
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: data => {
        console.log(data);
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
    console.log(errors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chageProfileMutate(values);
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
      <ProcessDiv isPWCorrect={isPWCorrect}>
        <span></span>
        <span></span>
      </ProcessDiv>
      <BtnBox>
        <button type="submit">변경</button>
        <button
          type="button"
          onClick={() => {
            setIsPWCorrect(false);
            dispatch(closeGlobalModal('profileChange'));
          }}>
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
    span {
      margin-top: 1rem;
      font-size: 1.3rem;
      color: red;
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
const ProcessDiv = styled.div<{isPWCorrect: boolean}>`
  display: flex;
  margin: 0 auto;
  span:nth-child(1) {
    width: 2.5rem;
    height: 0.6rem;
    background-color: ${props =>
      props.isPWCorrect === false
        ? props.theme.MainColor
        : props.theme.LightGray};
    margin: 0.5rem 0.3rem;
  }
  span:nth-child(2) {
    width: 2.5rem;
    height: 0.6rem;
    background-color: ${props =>
      props.isPWCorrect === true
        ? props.theme.MainColor
        : props.theme.LightGray};
    margin: 0.5rem 0.3rem;
  }
`;
