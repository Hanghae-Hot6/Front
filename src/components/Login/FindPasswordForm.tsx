import axios from 'axios';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import styled from 'styled-components';
import GlobalModal from '../../common/GlobalModal';
import NavigationButton from '../../common/NavigationButton';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';

type FindPasswordValueProps = {
  memberId: string;
  email: string;
  username: string;
};

function FindPasswordForm() {
  const dispatch = useAppDispatch();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  const init = {
    memberId: '',
    email: '',
    username: '',
  };

  const [values, setValue] = useState(init);

  // const {mutate: findPasswordMutate} = useMutation(
  //   async (values: FindPasswordValueProps) => {
  //     console.log(values);
  //     const response = await axios.post(
  //       // `${process.env.REACT_APP_BASE_URL}/members/findId`,
  //       values,
  //     );
  //     return response;
  //   },
  //   {
  //     onSuccess: data => {
  //       console.log(data);
  //       dispatch(openGlobalModal(''));
  //     },
  //     onError: error => {
  //       console.log(error);
  //     },
  //   },
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setValue({...values, [name]: value});
  };

  // submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      values.memberId === '' ||
      values.email === '' ||
      values.username === ''
    ) {
      dispatch(openGlobalModal('findPasswordEmptyInput'));
    } else {
      console.log(values);
      // findPasswordMutate(values);
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
              name="memberId"
              onChange={handleChange}
              value={values.memberId}
              label="아이디"></RegistStInput>
            {/* <RegistErrorSpan>{errors.memberId}</RegistErrorSpan> */}

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
            비밀번호 찾기
          </StNavBtn>
        </StContainer>
        {isGlobalModalOpen && dispatchId === 'findPasswordEmptyInput' && (
          <GlobalModal id="findPasswordEmptyInput" type="alertModal">
            <div>빈칸을 작성해주세요.</div>
          </GlobalModal>
        )}
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
