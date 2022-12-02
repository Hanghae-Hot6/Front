import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import GlobalModal from '../../common/GlobalModal';
import ProfileChange from './ProfileChange';
import styled from 'styled-components';
import {useMutation} from 'react-query';
import {memberApis} from '../../api/axiosConfig';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import ProfileCheckPassword from './ProfileCheckPassword';

function ProfileModalCollection() {
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
  const dispatch = useAppDispatch();
  const [isPWCorrect, setIsPWCorrect] = useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  console.log(isPWCorrect);
  const {mutate: sendInquiryMutate} = useMutation(
    async (textAreaValue: string) => {
      try {
        const response = await memberApis.postInquiryEmail(textAreaValue);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: data => {
        if (data?.data.success) {
          dispatch(openGlobalModal('successInquiry'));
        }
      },
      onError: error => {
        throw error;
      },
    },
  );

  const textAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.currentTarget;

    if (textAreaValue.length > 500) {
      return setTextAreaValue(value.slice(0, 500));
    }
    setTextAreaValue(value);
  };

  const sendEmailHandler = () => {
    if (textAreaValue.trim() === '') {
      dispatch(openGlobalModal('noText'));
    }
    sendInquiryMutate(textAreaValue.trim().slice(0, 500));
    setTextAreaValue('');
  };

  return (
    <>
      {isGlobalModalOpen && dispatchId === 'noAccessToken' && (
        <GlobalModal id="noAccessToken" type="alertModal" confirmPath="/login">
          <div>접근 권한이 없습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'noAccessUserId' && (
        <GlobalModal id="noAccessUserId" type="alertModal" confirmPath="/">
          <div>접근 권한이 없습니다.</div>
        </GlobalModal>
      )}

      {isGlobalModalOpen && dispatchId === 'readyFn' && (
        <GlobalModal id="readyFn" type="alertModal">
          <div>준비중인 기능입니다. 조금만 기다려주세요..!</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'profileChange' && (
        <GlobalModal id="profileChange" size="lg">
          {!isPWCorrect && (
            <ProfileCheckPassword
              isPWCorrect={isPWCorrect}
              setIsPWCorrect={setIsPWCorrect}
            />
          )}
          {isPWCorrect && (
            <ProfileChange
              isPWCorrect={isPWCorrect}
              setIsPWCorrect={setIsPWCorrect}
            />
          )}
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'successChangeProfile' && (
        <GlobalModal id="successChangeProfile" type="alertModal">
          <div>회원정보가 수정되었습니다!</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'noText' && (
        <GlobalModal id="noText" type="alertModal">
          <div>글을 작성해주세요...!</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'overText' && (
        <GlobalModal id="overText" type="alertModal">
          <div>500자 이하로 작성해주세요...!</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'successInquiry' && (
        <GlobalModal id="successInquiry" type="alertModal">
          <div>고객의 소리가 접수되었습니다.</div>
        </GlobalModal>
      )}
      {isGlobalModalOpen && dispatchId === 'inquiryMail' && (
        <GlobalModal
          id="inquiryMail"
          size="lg"
          type="confirmModal"
          onConfirmCallback={sendEmailHandler}>
          <StInquiryContainer>
            <h2>문의하기</h2>
            <StTextArea
              name="inquiryMail"
              value={textAreaValue}
              onChange={textAreaChangeHandler}
              placeholder={
                '공백포함 최대 500자까지 작성가능합니다.'
              }></StTextArea>
            <span>{`(${textAreaValue.length || 0}/500)`}</span>
          </StInquiryContainer>
        </GlobalModal>
      )}
    </>
  );
}

export default ProfileModalCollection;

const StInquiryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  span {
    font-size: 1.6rem;
    align-self: flex-end;
    right: 0;
    margin: 1rem 1.6rem 0 0;
  }
`;

const StTextArea = styled.textarea`
  border: 1px solid ${props => props.theme.Gray};
  min-height: 70%;
  max-height: 70%;
  min-width: 90%;
  max-width: 90%;
  resize: none;
  outline: none;
  margin-top: 1.5rem;
  :focus {
    border: 1px solid ${props => props.theme.MainColor};
  }
`;
