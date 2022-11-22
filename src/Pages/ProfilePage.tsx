import React from 'react';
import {ReactQueryDevtools} from 'react-query/devtools';
import ProfileDetail from '../components/Profile/ProfileDetail';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {getAccessToken, getUserId} from '../utils';
import ProfileClubList from '../components/Profile/ProfileClubList';
import {useAppDispatch} from '../Redux/store/store';
import {openGlobalModal} from '../Redux/modules/slices/modalSlice';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProfileContainer from '../components/Profile/ProfileContainer';
import GlobalModal from '../common/GlobalModal';
import ProfileModalCollection from '../components/Profile/ProfileModalCollection';

type ProfilePageProps = {};
type clubList = {
  clubName: string;
  contents: string;
  category: string;
  summary: string;
};
type ProfileData = {
  memberId: string;
  email: string;
  nickname: string;
  address: string;
  phoneNumber: string;
  password: string;
  passwordCheck: string;
  clubList: clubList[];
};

const ProfilePage = ({}: ProfilePageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlId = useParams();
  const accessToken = getAccessToken();
  const userId = getUserId();

  // const {data, isLoading, error} = useQuery(
  //   ['getProfile', userId],
  //   async () => {
  //     const {data} = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/members/${userId}`,
  //     );
  //     return data;
  //   },
  // );
  const data: ProfileData = {
    memberId: 'jwjw123',
    email: 'jiwoon@naver.com',
    nickname: '서지운',
    address: '천안시',
    phoneNumber: '010-1234-1234',
    password: 'asdfasdf1!',
    passwordCheck: 'asdfasdf1',
    clubList: [
      {
        clubName: '클럽1',
        contents: '',
        category: '인문',
        summary: '요약',
      },
      {
        clubName: '클럽1',
        contents: '',
        category: '사회',
        summary: '요약',
      },
    ],
  };

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

  return (
    <>
      <Header />
      <StSection>
        <ProfileContainer />
      </StSection>
      <Footer />

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ProfileModalCollection />
    </>
  );
};
export default ProfilePage;

const StSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 9rem;
  background-color: #fdfcff;
`;
