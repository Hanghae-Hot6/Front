import React from 'react';
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
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
};
type clubSign = {
  id: string;
};
const ClubDetail = () => {
  // , status, isLoading 추후에 쓰임
  const {id} = useParams();
  const {data} = useQuery<clubDetailType | undefined>(
    ['getClubDetail'],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}`,
      );
      return response.data.data;
    },
  );

  const {mutate: signUpClub} = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/clubs/${id}`,
        {
          // 같이 보낼거~
        },
      );
      return response;
    },
    {
      onSuccess: () => {
        alert('모임가입이 완료되었습니다!');
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
            <p
              style={{
                width: '300px',
                background: '#333',
                height: '300px',
              }}
              onClick={() => signUpClub()}>
              가입하기
            </p>
          </div>
        )}
      </Layout>
    </>
  );
};
export default ClubDetail;
