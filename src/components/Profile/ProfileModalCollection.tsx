import React from 'react';
import {useAppSelector} from '../../Redux/store/store';
import GlobalModal from '../../common/GlobalModal';
import ProfileChange from './ProfileChange';

function ProfileModalCollection() {
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

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
        <GlobalModal id="profileChange" size="xlg">
          <ProfileChange></ProfileChange>
        </GlobalModal>
      )}
    </>
  );
}

export default ProfileModalCollection;
