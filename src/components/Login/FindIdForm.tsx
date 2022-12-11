// Libraries(react관련 패키지, 그외 라이브러리)
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../Redux/store/store';

//components
import LoginModalCollection from './LoginModalCollection';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';

// 그외 (img, css, fn, params...)
import {memberApis} from '../../api/axiosConfig';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {FindIdValue} from '../../types/regist';
import * as L from './Login.style';

function FindIdForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const init = {
    email: '',
    username: '',
  };

  const [values, setValue] = useState(init);

  const {mutate: findIdMutate} = useMutation(
    async (values: FindIdValue) => {
      try {
        const response = await memberApis.changeMemberId(values);
        return response;
      } catch (error: any) {
        if (error.response.data.status === 401) {
          dispatch(openGlobalModal('unAuthorizedEmail'));
        }
      }
    },
    {
      onSuccess: data => {
        if (data?.status === 200 && data.data.success === true) {
          dispatch(openGlobalModal('findIdSendMessage'));
        }
      },
      onError: (error: any) => {
        throw error;
      },
    },
  );

  // onChange handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setValue({...values, [name]: value});
  };

  // submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email === '' || values.username === '') {
      dispatch(openGlobalModal('findIdEmptyInput'));
    } else {
      findIdMutate(values);
    }
  };

  return (
    <div>
      <RegistStForm
        onSubmit={handleSubmit}
        title="아이디 찾기"
        height="83rem"
        width="49.2rem">
        <RegistStInput
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          label="E-mail"></RegistStInput>

        <RegistStInput
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={values.username}
          label="실명"></RegistStInput>
        <L.ButtonContainer>
          <L.StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            아이디 찾기
          </L.StNavBtn>
          <L.StNavBtn
            type="button"
            bgColor="#5200FF"
            fontC="white"
            onClick={() => navigate('/login')}>
            로그인
          </L.StNavBtn>
        </L.ButtonContainer>
        <LoginModalCollection />
      </RegistStForm>
    </div>
  );
}

export default FindIdForm;
