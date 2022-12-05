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
      {isGlobalModalOpen && dispatchId === 'findPasswordEmptyInput' && (
        <GlobalModal id="findPasswordEmptyInput" type="alertModal">
          <div>빈칸을 작성해주세요.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'sendNewPassword' && (
        <GlobalModal
          id="sendNewPassword"
          type="alertModal"
          confirmPath="/login">
          <div>임시비밀번호 발송에 성공했습니다.</div>
        </GlobalModal>
      )}

      {isGlobalModalOpen && dispatchId === 'findIdEmptyInput' && (
        <GlobalModal id="findIdEmptyInput" type="alertModal">
          <div>빈칸을 작성해주세요.</div>
        </GlobalModal>
      )}

      {isGlobalModalOpen && dispatchId === 'findIdSendMessage' && (
        <GlobalModal
          id="findIdSendMessage"
          type="alertModal"
          confirmPath="/login">
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
    </>
  );
}

export default LoginModalCollection;
