import axios from 'axios';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import styled from 'styled-components';
import {memberApis} from '../../api/axiosConfig';
import GlobalModal from '../../common/GlobalModal';
import NavigationButton from '../../common/NavigationButton';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {FindPasswordValueType} from '../../types/regist';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';
import LoginModalCollection from './LoginModalCollection';

function FindPasswordForm() {
  const dispatch = useAppDispatch();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  const init = {
    id: '',
    email: '',
  };

  const [values, setValue] = useState(init);

  const {mutate: findPasswordMutate} = useMutation(
    async (values: FindPasswordValueType) =>
      await memberApis.changePassword(values),
    {
      onSuccess: data => {
        console.log(data);
        dispatch(openGlobalModal(''));
      },
      onError: error => {
        console.log(error);
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
      console.log(values);
      findPasswordMutate(values);
    }
  };

  return (
    <>
      <RegistStForm
        jc="flex-start"
        onSubmit={handleSubmit}
        title="비밀번호 변경"
        height="87rem"
        width="55.6rem">
        <StContainer>
          <div>
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
          </div>

          <StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            비밀번호 찾기
          </StNavBtn>
        </StContainer>
        <LoginModalCollection />
      </RegistStForm>
    </>
  );
}

export default FindPasswordForm;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  display: flex;
  width: 100%;
  height: 6rem;
  color: ${({fontC}) => fontC};
  background-color: ${({bgColor}) => bgColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
  align-items: center;
  justify-content: center;
`;
