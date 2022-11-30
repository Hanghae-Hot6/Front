import React, {useState} from 'react';
import {useMutation} from 'react-query';
import styled from 'styled-components';
import {memberApis} from '../../api/axiosConfig';
import GlobalModal from '../../common/GlobalModal';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {FindIdValue} from '../../types/regist';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';
import * as L from './Login.style';
function FindIdForm() {
  const dispatch = useAppDispatch();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
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
        console.log(error);
        if (error.response.data.status === 401) {
          dispatch(openGlobalModal('unAuthorizedEmail'));
        }
      }
    },
    {
      onSuccess: data => {
        console.log(data);
        dispatch(openGlobalModal('findIdSendMessage'));
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

  // const usernameRange = value => value.length > 2 && value.length < 7;
  // const contentRange = value => value.length > 0;
  // const username = useInput(comment.username, usernameRange);
  // const content = useInput(comment.comment, contentRange);

  return (
    <>
      <RegistStForm
        jc="flex-start"
        onSubmit={handleSubmit}
        title="아이디 찾기"
        height="87rem"
        width="55.6rem">
        <L.StContainer>
          <div>
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
          </div>
          <L.StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            아이디 찾기
          </L.StNavBtn>
        </L.StContainer>
        {isGlobalModalOpen && dispatchId === 'findIdEmptyInput' && (
          <GlobalModal id="findIdEmptyInput" type="alertModal">
            <div>빈칸을 작성해주세요.</div>
          </GlobalModal>
        )}

        {isGlobalModalOpen && dispatchId === 'findIdSendMessage' && (
          <GlobalModal id="findIdSendMessage" type="alertModal">
            <h2>이메일 발송!</h2>
            <div>
              <p>아이디가 전송되었습니다.</p>
              <p>이메일을 확인해 주세요!</p>
            </div>
          </GlobalModal>
        )}
        {isGlobalModalOpen && dispatchId === 'unAuthorizedEmail' && (
          <GlobalModal id="unAuthorizedEmail" type="alertModal">
            <h2>이메일 오류!</h2>
            <div>
              <p>등록되지 않은 이메일 입니다.</p>
              <p>작성한 이메일을 확인해 주세요!</p>
            </div>
          </GlobalModal>
        )}
      </RegistStForm>
    </>
  );
}

export default FindIdForm;
