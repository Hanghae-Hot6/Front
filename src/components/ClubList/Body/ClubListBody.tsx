import * as C from './ClubListBody.style';

type ClubListBodyProps = {};

const ClubListBody = ({}: ClubListBodyProps) => {
  return (
    <>
      <div>
        <C.ToCreateClubButton path="/create_club">
          모임 개설.. 플로팅 버튼
        </C.ToCreateClubButton>
      </div>
    </>
  );
};
export default ClubListBody;
