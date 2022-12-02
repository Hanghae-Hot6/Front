import {useState} from 'react';

import styled, {keyframes} from 'styled-components';
import {closeGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../Redux/store/store';
import RegistStInput from '../Elem/RegistStInput';
import eyeImg from '../../assets/eye.svg';
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import {CheckPasswordModalProps} from '../../types/profile';
import {memberApis} from '../../api/axiosConfig';

function ProfileCheckPassword({
  setIsPWCorrect,
  isPWCorrect,
}: CheckPasswordModalProps) {
  const dispatch = useAppDispatch();
  const [passwordValue, setPasswordValue] = useState<string>('');
  // 비밀번호 보이기, 숨기기
  const [passwordType, setPasswordType] = useState({
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
    }
  };

  const {mutate: passwordCheck} = useMutation(
    async (passwordValue: string) => {
      try {
        const response = await memberApis.passwordCheck(passwordValue);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: data => {
        console.log(data);
        // setPasswordValue('');
        // setIsPWCorrect(true);
      },
      onError: error => {
        throw error;
      },
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget;
    console.log(value);
    setPasswordValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPWCorrect(true);

    // passwordCheck(passwordValue);
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
          mgt="2rem"
          value={passwordValue}
          onChange={handleChange}>
          <img
            src={eyeImg}
            alt="password 보이기"
            id="password"
            onClick={handlePasswordType}
          />
        </RegistStInput>
      </div>
      <BtnBox>
        <button type="submit" onClick={() => setIsPWCorrect(true)}>
          비밀번호 확인
        </button>
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

export default ProfileCheckPassword;

const slideForm = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0.1;
    transform: translateX(25%);
  }
  100% {
    opacity: 0;
    transform: translateX(50%);
  }
`;
const StProfileChangeForm = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: space-between;
  /* animation: ${slideForm} 0.5s ease-in-out; */

  .inputsDiv {
    display: flex;
    height: 100%;
    flex-direction: column;
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

const StCheckBtn = styled.button`
  font-size: 1.4rem;
  color: ${props => props.theme.MainColor};
  border: 1px solid ${props => props.theme.MainColor};
  background-color: white;
  right: 0;
  margin-top: 4rem;
  text-align: center;
  white-space: nowrap;
`;
