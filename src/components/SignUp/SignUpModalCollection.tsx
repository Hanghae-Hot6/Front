import React from 'react';
import {
  closeGlobalModal,
  openGlobalModal,
} from '../../Redux/modules/slices/modalSlice';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';

function SignUpModalCollection() {
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
  return (
    <>
      {isGlobalModalOpen && dispatchId === 'signUpComplete' && (
        <GlobalModal id="signUpComplete" type="alertModal" confirmPath="/login">
          회원가입 완료되었습니다.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'emptyIdAlert' && (
        <GlobalModal id="emptyIdAlert" type="alertModal">
          아이디를 작성해주세요.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'idDoubleCheck' && (
        <GlobalModal id="idDoubleCheck" type="alertModal">
          중복확인 완료!
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'emailCertAlert' && (
        <GlobalModal id="emailCertAlert" type="alertModal">
          이메일을 작성해주세요.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'alreadyExistEmail' && (
        <GlobalModal id="alreadyExistEmail" type="alertModal">
          이미 존재하는 이메일 입니다.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'certNumEmptyAlert' && (
        <GlobalModal id="certNumEmptyAlert" type="alertModal">
          인증번호를 작성해주세요.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'certNumNotMatchAlert' && (
        <GlobalModal id="certNumNotMatchAlert" type="alertModal">
          인증번호가 일치하지 않습니다.
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'certNumMatchAlert' && (
        <GlobalModal id="certNumMatchAlert" type="alertModal">
          인증에 성공했습니다!
        </GlobalModal>
      )}
    </>
  );
}

export default SignUpModalCollection;
