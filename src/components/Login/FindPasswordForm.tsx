import React from 'react';
import styled from 'styled-components';
import NavigationButton from '../../common/NavigationButton';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';

function FindPasswordForm() {
  return (
    <>
      <RegistStForm
        jc="flex-start"
        // onSubmit={handleSubmit}
        title="비밀번호 변경"
        height="87rem"
        width="55.6rem">
        <StContainer>
          <div>
            <RegistStInput
              id="id"
              type="text"
              name="memberId"
              //   onChange={handleChange}
              //   value={values.memberId}
              label="아이디"></RegistStInput>
            {/* <RegistErrorSpan>{errors.memberId}</RegistErrorSpan> */}

            <RegistStInput
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              //   onChange={handleChange}
              //   value={values.memberId}
              label="전화번호 입력"></RegistStInput>
            {/* <RegistErrorSpan>{errors.memberId}</RegistErrorSpan> */}

            <RegistStInput
              id="certNumb"
              type="number"
              name="certNumb"
              //   onChange={handleChange}
              //   value={values.password}
              label="인증번호"></RegistStInput>
          </div>
          <NavigationButton>비밀번호 찾기</NavigationButton>
        </StContainer>
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
