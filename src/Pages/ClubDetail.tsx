import React from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import {getAccessToken} from '../utils';
// type ClubDetailProps = {};
type clubDetailType = {
  leader: string;
  clubName: string;
  clubIntro: string;
  plan: string;
  location: string;
  schedule: string;
  memberLimit: number;
  category: string;
  summary: string;
  imageUrl: string;
  accessToken: string;
  id: number | string;
  subscription: boolean;
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
  //클럽 가입하기 api
  const {mutate: signUpClub} = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}`,
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
            {data.subscription ? (
              <p
                style={{
                  width: '300px',
                  background: '#333',
                  height: '300px',
                  color: '#fff',
                }}>
                이미 가입한 모임입니다.
              </p>
            ) : (
              <p
                style={{
                  width: '300px',
                  background: '#333',
                  height: '300px',
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
