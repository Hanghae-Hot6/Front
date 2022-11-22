import React, {useEffect} from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import {getAccessToken} from '../utils';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import heartOn from '../assets/heartOn.svg';
import heartOff from '../assets/heartOff.svg';
import GlobalModal from '../common/GlobalModal';
// type ClubDetailProps = {};
type clubDetailType = {
  accessToken: string;
  id: number | string | undefined;
  plan: string;
  memberLimit: number;
  summary: string;
  imageUrl: string;
  bookImage1: string;
  bookImage2: string;
  bookImage3: string;
  bookIntro: string;
  bookLink1: string;
  bookLink2: string;
  bookLink3: string;
  bookName1: string;
  bookName2: string;
  bookName3: string;
  bookSummary: string;
  category: string;
  clubId: number;
  clubIntro: string;
  clubName: string;
  clubSummary: string;
  interest: boolean;
  leader: string;
  location: string;
  participantNum: number;
  period: string;
  schedule: string;
  subscription: boolean;
  thumbnail: string;
};

const ClubDetail = () => {
  // , status, isLoading 추후에 쓰임
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const {id} = useParams();
  // 화면에 클럽정보 뿌려주는api

  const {data, status} = useQuery<clubDetailType | undefined>(
    ['getClubDetail', accessToken, id],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },
  );

  //모임 가입하기 api
  const {mutate: signUpClub} = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/join`,
        id,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  // 관심 모임 api
  const {mutate: interestClub} = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/interest`,
        id,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },
    {
      onSuccess: data => {
        alert(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  // 클럽탈퇴하기
  const {mutate: delClub} = useMutation(
    async () => {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/withdraw`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      return response.data.data;
    },

    {
      onSuccess: data => {
        alert('탈퇴 하시겠습니까?');
        alert('탈퇴 완료');
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    if (status === 'error') {
      return alert('로그인이 필요합니다.'), navigate('/Login');
    }
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        {data && (
          <>
            <MainContent>
              <div>
                <ImageWrap>
                  <img src={data.bookImage1} alt={data.bookIntro} />
                </ImageWrap>
              </div>

              <div>
                <TitleWrap>
                  <h3>{data.category}</h3>
                  <h2>{data.clubSummary}</h2>
                  <p>{data.clubName}</p>
                </TitleWrap>
                <ClubInfoWrap>
                  <p>
                    <span>장소</span>
                    {data.location}
                  </p>
                  <p>
                    <span>날짜</span>
                    {data.period}
                  </p>
                  <p>
                    <span>주최자</span>
                    {data.leader}
                  </p>
                  <p>
                    <span>참석 인원</span>
                    {data.participantNum}
                  </p>
                </ClubInfoWrap>

                <ClubJoin>
                  {data.interest ? (
                    <InterestBtn onClick={() => interestClub()}>
                      <img src={heartOn} alt="관심모임등록" />
                    </InterestBtn>
                  ) : (
                    <InterestBtn onClick={() => interestClub()}>
                      <img src={heartOff} alt="관심모임해제" />
                    </InterestBtn>
                  )}
                  {data.subscription ? (
                    <>
                      <Btn style={{borderRight: 'none', cursor: 'default'}}>
                        참석중
                      </Btn>
                      <Btn
                        onClick={() => {
                          delClub();
                        }}>
                        탈퇴하기
                      </Btn>
                    </>
                  ) : (
                    <JoinBtn onClick={() => signUpClub()}>참석하기</JoinBtn>
                  )}
                </ClubJoin>
              </div>
            </MainContent>
          </>
        )}
      </Layout>
    </>
  );
};
export default ClubDetail;

export const MainContent = styled.div`
  display: flex;
  margin-top: 5rem;
`;

export const ImageWrap = styled.div`
  width: 57.3rem;
  height: 56rem;
  background-color: #cacad7;
  display: flex;
  margin-right: 9.2rem;
  overflow: hidden;
  > img {
    display: inline-block;
    margin: 10% auto;
    width: 50.4rem;
    height: 90%;
    object-fit: cover;
    object-position: top;
  }
`;

export const TitleWrap = styled.div`
  width: 59.2rem;
  border-bottom: 1px solid #dbdbdb;

  > h3 {
    color: gray;
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
  }
  > h2 {
    font-weight: 600;
    font-size: 3rem;
    margin-bottom: 1.8rem;
  }
  > p {
    color: ${props => props.theme.MainColor};
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 30px;
  }
`;

export const ClubInfoWrap = styled.div`
  margin-top: 6rem;
  > p {
    font-size: 2rem;
    margin-bottom: 3rem;
    color: ${props => props.theme.Gray};
  }
  > p > span {
    display: inline-block;
    width: 10rem;
    font-weight: 600;
  }
`;

export const ClubJoin = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  margin-top: 8.5rem;
`;

export const InterestBtn = styled.button`
  padding: 0;
  width: 8rem;
  height: 8rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Btn = styled.button`
  width: 256px;
  background: #fff;
  border: 1px solid ${props => props.theme.MainColor};
  height: 80px;
  color: ${props => props.theme.MainColor};
  transition: all 0.5s;
  font-weight: 600;
  box-sizing: border-box;
  :hover {
    color: #fff;
    background-color: ${props => props.theme.MainColor};
    border: 1px solid transparent;
  }
`;

export const JoinBtn = styled.button`
  font-size: 2rem;
  font-weight: 600;
  width: 512px;
  background: #222;
  height: 80px;
  color: #fff;
`;
