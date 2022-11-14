import React from 'react';
// import NavigationButton from '../../../common/NavigationButton';
import * as C from './ClubListBody.style';

const ClubListBody = () => {
  return (
    <>
      <div>모임이 없습니다.</div>

      <C.ToCreateClubButton path="/create_club">
        모임 개설.. 플로팅 버튼
      </C.ToCreateClubButton>
    </>
  );
};
export default ClubListBody;
