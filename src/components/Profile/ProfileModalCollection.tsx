import React from 'react';
import {useAppSelector} from '../../Redux/store/store';
import GlobalModal from '../../common/GlobalModal';

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
      {isGlobalModalOpen && dispatchId === 'clubDelete' && (
        <GlobalModal id="clubDelete" type="confirmModal">
          <div>정말 삭제하시겠습니까?</div>
        </GlobalModal>
      )}
    </>
  );
}

export default ProfileModalCollection;
