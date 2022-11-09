import React from 'react';
import NavigationButton from '../../../common/NavigationButton';
import * as C from './ClubListBody.style';

type ClubListBodyProps = {};

const ClubListBody = ({}: ClubListBodyProps) => {
  return (
    <>
      <div>모임리스트 내용</div>

      <C.ToCreateClubButton path="/create_club">
        모임 개설.. 플로팅 버튼
      </C.ToCreateClubButton>
    </>
  );
};
export default ClubListBody;
