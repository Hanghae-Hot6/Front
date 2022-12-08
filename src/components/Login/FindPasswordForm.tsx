import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {memberApis} from '../../api/axiosConfig';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../Redux/store/store';
import {FindPasswordValueType} from '../../types/regist';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';
import LoginModalCollection from './LoginModalCollection';
import * as L from './Login.style';
import {useNavigate} from 'react-router-dom';

function FindPasswordForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const init = {
    id: '',
    email: '',
  };

  const [values, setValue] = useState(init);

  const {mutate: findPasswordMutate} = useMutation(
    async (values: FindPasswordValueType) => {
      try {
        const response = await memberApis.changePassword(values);
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
          dispatch(openGlobalModal('sendNewPassword'));
        }
      },
      onError: error => {
        throw error;
      },
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setValue({...values, [name]: value});
  };

  // submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.id === '' || values.email === '') {
      dispatch(openGlobalModal('findPasswordEmptyInput'));
    } else {
      findPasswordMutate(values);
    }
  };

  return (
    <div>
      <RegistStForm
        jc="flex-start"
        onSubmit={handleSubmit}
        title="비밀번호 변경"
        height="87rem"
        width="55.6rem">
        <L.StContainer>
          <RegistStInput
            id="id"
            type="text"
            name="id"
            onChange={handleChange}
            value={values.id}
            label="아이디"></RegistStInput>

          <RegistStInput
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            label="E-mail"></RegistStInput>

          <L.ButtonContainer>
            <L.StNavBtn type="submit" bgColor="#5200FF" fontC="white">
              비밀번호 찾기
            </L.StNavBtn>
            <L.StNavBtn
              type="button"
              bgColor="#5200FF"
              fontC="white"
              onClick={() => navigate('/login')}>
              로그인
            </L.StNavBtn>
          </L.ButtonContainer>
        </L.StContainer>
        <LoginModalCollection />
      </RegistStForm>
    </div>
  );
}

export default FindPasswordForm;
