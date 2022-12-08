import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getAccessToken, getUserId} from '../utils';
import {useAppDispatch} from '../Redux/store/store';
import {openGlobalModal} from '../Redux/modules/slices/modalSlice';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import ProfileContainer from '../components/Profile/ProfileContainer';
import ProfileModalCollection from '../components/Profile/ProfileModalCollection';
import {useQuery} from 'react-query';
import {memberApis} from '../api/axiosConfig';
import Header from '../components/Header/Header';
import ChatBody from '../components/Chat/ChatBody/ChatBody';
import chatBtn from '../assets/chatBtn.svg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlId = useParams();
  const accessToken = getAccessToken();
  const userId = getUserId();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 돌려보냄
    if (!accessToken) {
      dispatch(openGlobalModal('noAccessToken'));
    } else if (urlId.userId !== userId) {
      // userId와 url의 params가 일치하지 않으면 메인페이지로 돌려보냄
      // strict mode를 끄니까 두 번 실행 되지 않는 것을 확인함.
      dispatch(openGlobalModal('noAccessUserId'));
      // alert('접근 권한이 없습니다');
    }
  }, [accessToken, navigate, urlId.userId, userId, dispatch]);

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery(
    ['getProfile', userId],
    async () => {
      try {
        const {data} = await memberApis.myPageInfo();
        return data;
      } catch (error: any) {
        // if (error.status === 404){
        // } console.log(error);
      }
    },
    {
      onSuccess: data => {},
      onError: error => {
        throw error;
      },
    },
  );

  return (
    <Stdiv>
      <Header />
      <StSection>
        <ProfileContainer data={profileData?.data} />
      </StSection>
      {showChat && <ChatBody />}
      <Footer />
      <BtnWrap style={{height: '7rem'}}>
        <ChatButton
          onClick={() => {
            setShowChat(!showChat);
          }}>
          <img src={chatBtn} alt="chatBtn" />
        </ChatButton>
      </BtnWrap>
      <ProfileModalCollection />
    </Stdiv>
  );
};
export default ProfilePage;

const Stdiv = styled.div`
  overflow: hidden;
`;

const StSection = styled.section`
  height: 100%;
  margin: 0 auto;
  background-color: #fdfcff;
`;

const ChatButton = styled.button`
  width: 5.5rem;
  height: 5.5rem;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: #5200ff;
  background-color: #5200ff;
  margin-left: 0.8rem;
  margin-top: 0.7rem;
`;
const BtnWrap = styled.div`
  position: fixed;
  top: 80%;
  right: 11.3rem;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.2);
  width: 7rem;
  border-radius: 30px;
  transition: all 0.5s;
  @media screen and (max-width: 576px) {
    top: 85%;
    right: 7%;
    width: 7rem;
    border-radius: 50%;
  }

  :hover {
    transform: matrix3d(
        1,
        0,
        0,
        0,
        0,
        0.866025,
        0.5,
        0,
        0,
        -0.5,
        0.866025,
        0,
        0,
        0,
        0,
        1
      )
      matrix3d(
        0.866025,
        0,
        -0.5,
        0,
        0,
        1,
        0,
        0,
        0.5,
        0,
        0.866025,
        0,
        0,
        0,
        0,
        1
      )
      translate3d(2px, 2px, -2px);
  }
  button {
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
  }
  > button:hover {
    transform: translate3d(5px, 5px, -5px);
  }
`;
