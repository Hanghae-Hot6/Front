import {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import GlobalModal from '../../common/GlobalModal';
import {closeGlobalModal} from '../../Redux/modules/slices/modalSlice';
import Timer from '../Login/Timer';
import {CertNumValuesType} from '../../types/regist';
import * as S from './SignUp.style';

const certNumInit = {
  certNumber0: '',
  certNumber1: '',
  certNumber2: '',
  certNumber3: '',
  certNumber4: '',
  certNumber5: '',
  certNumber6: '',
  certNumber7: '',
};

type SignUpModalTypes = {
  emailModalCheckHandler: (certNumObj: any) => void;
};

function SignUpModalCollection({emailModalCheckHandler}: SignUpModalTypes) {
  const dispatch = useAppDispatch();

  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  // 인증번호 모달
  const [certNumValue, setCertNumValue] =
    useState<CertNumValuesType>(certNumInit);

  const inputRef = useRef<null[] | HTMLInputElement[]>([]);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const {name, value} = e.currentTarget;
    setCertNumValue({...certNumValue, [name]: value});

    if (value.length >= 1) {
      inputRef.current[idx]!.className = 'On';
    } else {
      inputRef.current[idx]!.className = 'certNumInput';
    }
    if (idx + 1 === 8) {
      inputRef.current[idx]!.focus();
    } else {
      inputRef.current[idx + 1]!.focus();
    }
  };
  return (
    <>
      {isGlobalModalOpen && dispatchId === 'signUpComplete' && (
        <GlobalModal id="signUpComplete" type="alertModal" confirmPath="/login">
          <div>회원가입 완료되었습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'emptyIdAlert' && (
        <GlobalModal id="emptyIdAlert" type="alertModal">
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

      {isGlobalModalOpen && dispatchId === 'emailCheck' && (
        <GlobalModal id="emailCheck" size="lg">
          <S.StModalDiv>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                return emailModalCheckHandler(certNumValue);
              }}>
              <div>
                <h1>이메일 인증</h1>
                <span>메일로 전송된 인증번호를 입력해주세요.</span>

                <Timer initMin={5} initSec={0} />
                <S.StInputBox>
                  <input
                    type="text"
                    name="certNumber0"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[0] = elem)}
                    onChange={e => {
                      handleFocus(e, 0);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber1"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[1] = elem)}
                    onChange={e => {
                      handleFocus(e, 1);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber2"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[2] = elem)}
                    onChange={e => {
                      handleFocus(e, 2);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber3"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[3] = elem)}
                    onChange={e => {
                      handleFocus(e, 3);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber4"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[4] = elem)}
                    onChange={e => {
                      handleFocus(e, 4);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber5"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[5] = elem)}
                    onChange={e => {
                      handleFocus(e, 5);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber6"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[6] = elem)}
                    onChange={e => {
                      handleFocus(e, 6);
                    }}
                  />
                  <input
                    type="text"
                    name="certNumber7"
                    className="certNumInput"
                    maxLength={1}
                    ref={elem => (inputRef.current[7] = elem)}
                    onChange={e => {
                      handleFocus(e, 7);
                    }}
                  />
                </S.StInputBox>
              </div>
              <div>
                <button type="submit">확인</button>
                <button
                  type="button"
                  onClick={() => {
                    setCertNumValue(certNumInit);
                    dispatch(closeGlobalModal('emailCheck'));
                  }}>
                  취소
                </button>
              </div>
            </form>
          </S.StModalDiv>
        </GlobalModal>
      )}
    </>
  );
}

export default SignUpModalCollection;
