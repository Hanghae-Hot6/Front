import ProfileClubList from './ProfileClubList';
import ProfileDetail from './ProfileDetail';
import logo from '../../assets/logo.svg';
import {ProfileDataType} from '../../types/regist';
import * as P from './Profile.style';

function ProfileContainer({data}: ProfileDataType) {
  return (
    <>
      <P.StContainer>
        <P.StProfileBox>
          <P.StTitle>
            <img src={logo} alt="logo" />
            <P.StSpan>마이페이지</P.StSpan>
          </P.StTitle>

          <P.StInfoDiv>
            <P.StUserInfoSection>
              <ProfileDetail data={data} />
            </P.StUserInfoSection>

            <P.StClubInfoSection>
              <ProfileClubList data={data} />
            </P.StClubInfoSection>
          </P.StInfoDiv>
        </P.StProfileBox>
      </P.StContainer>
    </>
  );
}

export default ProfileContainer;
