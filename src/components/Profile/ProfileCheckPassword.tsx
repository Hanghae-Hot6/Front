import {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {closeGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../Redux/store/store';
import RegistStInput from '../Elem/RegistStInput';
import eyeImg from '../../assets/eye.svg';
import {useMutation} from 'react-query';
import {CheckPasswordModalProps} from '../../types/profile';
import {memberApis} from '../../api/axiosConfig';

function ProfileCheckPassword({
  setIsPWCorrect,
  isPWCorrect,
}: CheckPasswordModalProps) {
  const dispatch = useAppDispatch();
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
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
        console.log(passwordValue);
        const response = await memberApis.passwordCheck(passwordValue);
        return response;
      } catch (error: any) {
        console.log(error);
      }
    },
    {
      onSuccess: data => {
        console.log(data);
        if (data?.status === 200 && data.data.success === true) {
          setMessage(data.data.error);
          setIsPWCorrect(true);
        } else if (data?.data.success === false) {
          setMessage(data.data.error);
        }
      },
      onError: (error: any) => {
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
    // setIsPWCorrect(true);
    console.log(passwordValue);
    passwordCheck(passwordValue);
  };

  return (
    <StProfileChangeForm onSubmit={handleSubmit} isPWCorrect={isPWCorrect}>
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
        <span>{message}</span>
      </div>
      <ProcessDiv isPWCorrect={isPWCorrect}>
        <span></span>
        <span></span>
      </ProcessDiv>
      <BtnBox>
        <button type="submit">비밀번호 확인</button>
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
const StProfileChangeForm = styled.form<{isPWCorrect: boolean}>`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: space-between;
  /* animation: ${slideForm} 0.5s ease-in-out; */
  /* animation: ${props =>
    props.isPWCorrect === true ? `${slideForm} 0.5s ease in out` : ''}; */
  /* transition: all 2s ease-in-out; */

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
