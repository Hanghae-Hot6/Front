import React from 'react';
import RegistErrorSpan from '../Elem/RegistErrorSpan';
import RegistStForm from '../Elem/RegistStForm';
import RegistStInput from '../Elem/RegistStInput';

function FindIdForm() {
  return (
    <>
      <RegistStForm
        // onSubmit={handleSubmit}
        title="아이디 찾기"
        height="87rem"
        width="55.6rem">
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
      </RegistStForm>
    </>
  );
}

export default FindIdForm;
