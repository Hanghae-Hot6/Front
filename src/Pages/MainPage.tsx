import React from 'react';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Main/Banner';
import Category from '../components/Main/Category';
import ClubEpilogue from '../components/Main/ClubEpilogue';
import PopularClub from '../components/Main/PopularClub';
import RecommendationClub from '../components/Main/RecommendationClub';

type MainPageProps = {};

const MainPage = ({}: MainPageProps) => {
  return (
    <>
      {/**배너슬라이드(기능 완),
       * 카테고리(get에서 카테고리 버튼을 누르면 무엇이 일어나는 가?) => 모임 리스트 페이지(기능 완) ,
       * 추천도서 모임(get) => 어떤 식으로? / 정확한 누구의 추천인지 구성 방법 배치 /,
       * 인기 모임TOP10(get) => (멤버수 or 좋아요 개수로 sorting),
       * 독서 모임 후기(get) => (후기,별점) 필요
       * 가입하기 버튼누르면 가입요청
       * 좋아요버튼*/}

      <Layout>
        <Banner />
        <Category />
        <PopularClub />
        <RecommendationClub />
        <ClubEpilogue />
      </Layout>
    </>
  );
};
export default MainPage;
