import React from 'react';
import {useQuery} from 'react-query';
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

const ClubDetail = () => {
  // , status, isLoading 추후에 쓰임
  const {id} = useParams();
  const {data} = useQuery<clubDetailType | undefined>(
    ['getClubDetail'],
    async () => {
      const response = await axios.get(`http://43.201.69.50:8080/clubs/${id}`);
      return response.data.data;
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
          </div>
        )}
      </Layout>
    </>
  );
};
export default ClubDetail;
