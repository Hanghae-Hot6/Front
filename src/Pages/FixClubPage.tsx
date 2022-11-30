import React from 'react';
import Layout from '../components/Layout/Layout';
import {CreateClubFixClubPageLayout} from '../components/CreateClub_FixClub/Layout/CreateClubFixClubPageLayout';
import CreateClubTitle from '../components/CreateClub_FixClub/Title/CreateClubTitle';
import ThinLine from '../common/ThinLine';
import Theme from '../theme/Theme';
import CreateClubBody from '../components/CreateClub_FixClub/Body/CreateClubBody';
import {useNavigate, useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {clubDetailType, SubmitClubType} from '../types/clubList';
import {clubApis} from '../api/axiosConfig';
type FixClubPageProps = {};

const FixClubPage = ({}: FixClubPageProps) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data, status} = useQuery<clubDetailType | undefined>(
    ['getClubDetail', id],
    async ({queryKey}: any) => {
      const response = await clubApis.getClubDetail(queryKey[1]);
      return response.data.data;
    },
    {
      retry: 0,
      onError: (error: any) => {
        // 로그인 에러 남바 : 403 or 401
        if (error.response.status === 500) {
          return alert('로그인이 필요합니다.'), navigate('/Login');
        }
      },
    },
  );

  console.log(data);

  let fixClubData: SubmitClubType;

  if (data) {
    // fixClubData = {
    //   clubName: data.clubName,
    //   category: data.category,
    //   clubIntro: data.clubIntro,
    //   // book1: data.bookLink1,
    //   // book2: string;
    //   // book3: string;
    //   thumbnail: data.thumbnail,
    //   // memberMaxNum: data.memberLimit,
    //   // startDate: data.,
    //   // finishDate: string;
    //   location: data.location,
    //   schedule: data.schedule,
    //   clubSummary: data.clubSummary,
    //   bookSummary: data.bookSummary,
    // };
  }

  return (
    <>
      <Layout>
        <CreateClubFixClubPageLayout>
          <CreateClubTitle title="모임 수정하기" />
          <ThinLine color={Theme.MainColor} />
          <CreateClubBody />
        </CreateClubFixClubPageLayout>
      </Layout>
    </>
  );
};
export default FixClubPage;
