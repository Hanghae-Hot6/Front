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
          <div>회원가입 완료되었습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'emptyIdAlert' && (
        <GlobalModal id="emptyIdAlert" type="confirmModal">
          <div>아이디를 작성해주세요.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'idCheckTrue' && (
        <GlobalModal id="idCheckTrue" type="alertModal">
          <div>중복확인 완료!</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'idCheckFalse' && (
        <GlobalModal id="idCheckFalse" type="alertModal">
          <div>사용중인 아이디 입니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'emailCertAlert' && (
        <GlobalModal id="emailCertAlert" type="alertModal">
          <div>이메일을 작성해주세요.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'alreadyExistEmail' && (
        <GlobalModal id="alreadyExistEmail" type="alertModal">
          <div>이미 존재하는 이메일 입니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'certNumEmptyAlert' && (
        <GlobalModal id="certNumEmptyAlert" type="alertModal">
          <div>인증번호를 작성해주세요.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'certNumNotMatchAlert' && (
        <GlobalModal id="certNumNotMatchAlert" type="alertModal">
          <div>인증번호가 일치하지 않습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'certNumMatchAlert' && (
        <GlobalModal id="certNumMatchAlert" type="alertModal">
          <div>인증에 성공했습니다!</div>
        </GlobalModal>
      )}
    </>
  );
}

export default SignUpModalCollection;
