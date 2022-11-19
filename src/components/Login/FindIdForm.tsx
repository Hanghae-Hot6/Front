import React from 'react';
import styled from 'styled-components';
import NavigationButton from '../../common/NavigationButton';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';

function FindIdForm() {
  return (
    <>
      <RegistStForm
        jc="flex-start"
        // onSubmit={handleSubmit}
        title="아이디 찾기"
        height="87rem"
        width="55.6rem">
        <StContainer>
          <div>
            <RegistStInput
              id="email"
              type="email"
              name="email"
              // onChange={handleChange}
              // value={values.email}
              label="E-mail"></RegistStInput>
            {/* <RegistErrorSpan>{errors.email}</RegistErrorSpan> */}

            <RegistStInput
              id="username"
              type="text"
              name="username"
              // onChange={handleChange}
              // value={values.username}
              label="실명"></RegistStInput>
            {/* <RegistErrorSpan>{errors.username}</RegistErrorSpan> */}
          </div>
          <NavigationButton>아이디 찾기</NavigationButton>
        </StContainer>
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
