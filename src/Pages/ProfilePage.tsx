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
import axios from 'axios';
import {useQuery} from 'react-query';
import {memberApis} from '../api/axiosConfig';

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

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlId = useParams();
  const accessToken = getAccessToken();
  const userId = getUserId();

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
    data: ProfileData,
    isLoading,
    error,
  } = useQuery(
    ['getProfile', userId],
    async () => {
      try {
        const {data} = await memberApis.myPageInfo();
        return data;
      } catch (error) {
        console.log(error);
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
        <ProfileContainer data={ProfileData?.data} />
      </StSection>
      <Footer />

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
