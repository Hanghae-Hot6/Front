import React from 'react';
import GlobalModal from '../../common/GlobalModal';
import {useAppSelector} from '../../Redux/store/store';

function LoginModalCollection() {
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
  return (
    <>
      {isGlobalModalOpen && dispatchId === 'loginComplete' && (
        <GlobalModal id="loginComplete" type="alertModal" confirmPath="/">
          <div>로그인 되었습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'loggingIn' && (
        <GlobalModal id="loggingIn" type="alertModal" confirmPath="/">
          <div>이미 로그인 중 입니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'logIn-401Error' && (
        <GlobalModal id="logIn-401Error" type="alertModal" confirmPath="/login">
          <h2>로그인 실패</h2>
          <div>없는 정보입니다. 회원가입 해주세요.</div>
        </GlobalModal>
      )}
    </>
  );
}

export default LoginModalCollection;
