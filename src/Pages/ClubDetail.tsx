import React from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import {getAccessToken} from '../utils';
// type ClubDetailProps = {};
type clubDetailType = {
  accessToken: string;
  id: number | string;
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
  const {id} = useParams();
  // 화면에 클럽정보 뿌려주는api
  const {data} = useQuery<clubDetailType | undefined>(
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

  const {mutate: interestDelClub} = useMutation(
    async () => {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}/interest`,
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

  console.log(data);

  return (
    <>
      <Layout>
        {data && (
          <div>
            <h2>{data.category}</h2>
            <p>{data.clubName}</p>
            <div>{data.clubIntro}</div>
            <span>{data.plan}</span>
            <img src={data.imageUrl} alt={data.imageUrl} />
            <h3>{data.leader}</h3>
            <p>{data.schedule}</p>
            {data.interest ? (
              <p
                style={{
                  width: '100px',
                  background: '#333',
                  height: '100px',
                  color: '#fff',
                }}
                onClick={() => interestDelClub()}>
                빈 하트(관심 안된상태)
              </p>
            ) : (
              <p
                style={{
                  width: '100px',
                  background: '#fff',
                  height: '100px',
                  color: '#333',
                  border: '1px solid #333',
                }}
                onClick={() => interestClub()}>
                색깔(관심등록된 상태)
              </p>
            )}
            {data.subscription ? (
              <p
                style={{
                  width: '300px',
                  background: '#333',
                  height: '100px',
                  color: '#fff',
                }}>
                이미 가입한 모임입니다.
              </p>
            ) : (
              <p
                style={{
                  width: '300px',
                  background: '#333',
                  height: '100px',
                  color: '#fff',
                }}
                onClick={() => signUpClub()}>
                가입하기
              </p>
            )}
          </div>
        )}
      </Layout>
    </>
  );
};
export default ClubDetail;
