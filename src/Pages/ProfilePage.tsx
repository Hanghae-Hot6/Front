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
      navigate('/login');
    } else if (urlId.userId !== userId) {
      // userId와 url의 params가 일치하지 않으면 메인페이지로 돌려보냄
      // strict mode를 끄니까 두 번 실행 되지 않는 것을 확인함.
      dispatch(openGlobalModal('noAccess'));
      // alert('접근 권한이 없습니다');
      // navigate('/');
    }
  }, [accessToken, navigate, urlId.userId, userId, dispatch]);

  return (
    <>
      <Header />
      <StSection>
        <StProfileBox>
          <ProfileDetail data={data} />
          <ProfileClubList clubList={data.clubList} />
        </StProfileBox>
      </StSection>
      <Footer />

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
const StProfileBox = styled.div`
  display: flex;
  height: 60.5rem;
  width: 97.3rem;
  border-radius: 10px;
  margin: 18.5rem auto;
  /* background-color: #fff;
  border: 1px solid #c1a4ff;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08); */
`;
