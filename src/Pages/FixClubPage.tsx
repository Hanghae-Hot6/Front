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
      refetchOnWindowFocus: false,
      retry: 0,
      onError: (error: any) => {
        // 로그인 에러 남바 : 403 or 401
        if (error.response.status === 500) {
          return alert('로그인이 필요합니다.'), navigate('/Login');
        }
      },
    },
  );

  let fixClubDataYo: SubmitClubType | undefined;

  if (data) {
    let dateFromData = data.period;
    let startDate = dateFromData.substring(0, 10);
    let finishDate = dateFromData.substring(13, 23);

    fixClubDataYo = {
      clubName: data.clubName,
      category: data.category,
      clubIntro: data.clubIntro,
      book1: data.book1,
      book2: data.book2,
      book3: data.book3,
      thumbnail: data.thumbnail,
      memberMaxNum: data.memberLimit?.toString(),
      startDate: startDate,
      finishDate: finishDate,
      location: data.location,
      schedule: data.schedule,
      clubSummary: data.clubSummary,
      bookSummary: data.bookSummary,
    };
  } else {
    fixClubDataYo = undefined;
  }

  return (
    <>
      <Layout>
        <CreateClubFixClubPageLayout>
          <CreateClubTitle title="모임 수정하기" />
          <ThinLine color={Theme.MainColor} />
          {status === 'success' && (
            <CreateClubBody fixClubData={fixClubDataYo} clubId={data?.clubId} />
          )}
        </CreateClubFixClubPageLayout>
      </Layout>
    </>
  );
};
export default FixClubPage;
