import axios from 'axios';
import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import styled from 'styled-components';
import GlobalModal from '../../common/GlobalModal';
import NavigationButton from '../../common/NavigationButton';
import useInput from '../../Hooks/useInput';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';

type FindIdValueProps = {
  email: string;
  username: string;
};

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
    async (values: FindIdValueProps) => {
      console.log(values);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/findId`,
        values,
      );
      return response;
    },
    {
      onSuccess: data => {
        console.log(data);
        dispatch(openGlobalModal('findIdSendMessage'));
      },
      onError: error => {
        console.log(error);
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
        <StContainer>
          <div>
            {/* <RegistStInput
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={value}
              label="E-mail"></RegistStInput> */}

            <RegistStInput
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              label="E-mail"></RegistStInput>
            {/* <RegistErrorSpan>{errors.email}</RegistErrorSpan> */}

            <RegistStInput
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              label="실명"></RegistStInput>
            {/* <RegistErrorSpan>{errors.username}</RegistErrorSpan> */}
          </div>
          <StNavBtn type="submit" bgColor="#5200FF" fontC="white">
            아이디 찾기
          </StNavBtn>
        </StContainer>
        {isGlobalModalOpen && dispatchId === 'findIdEmptyInput' && (
          <GlobalModal id="findIdEmptyInput" type="alertModal">
            <div>빈칸을 작성해주세요.</div>
          </GlobalModal>
        )}
        {isGlobalModalOpen && dispatchId === 'findIdSendMessage' && (
          <GlobalModal id="findIdSendMessage" type="alertModal">
            <div>아이디가 전송되었습니다. 이메일을 확인해 주세요!</div>
          </GlobalModal>
        )}
      </RegistStForm>
    </>
  );
}

export default FindIdForm;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  display: flex;
  width: 40rem;
  height: 6rem;
  color: ${({fontC}) => fontC};
  background-color: ${({bgColor}) => bgColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
  align-items: center;
  justify-content: center;
`;
