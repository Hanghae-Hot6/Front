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
       * -------------- 추가적인 API --------------
       * 헤더에 검색 기능 ,
       * 추천도서 모임 (get) => 어떤 식으로? / 정확한 누구의 추천인지 구성 방법 배치 /,
       * 인기 모임TOP5 (get) => (멤버수 or 좋아요 개수로 sorting),
       * 독서 모임 후기 (get) => (후기or별점) 필요 ,
       * 모임 디테일 페이지 (post?)참석하기 버튼 => 참석하기 ,
       * 모임 디테일 페이지 (post?)좋아요버튼 => 좋아요 ,
       * 모임 디테일 페이지 (get) 추천 모임,
       * 후기(댓글) 더보기 --> 새로운 페이지? 보류
       * 카테고리별 클럽데이터에서 클럽 ID값도 같이 보내주세용 ~~ ,
       * 디자이너님 개인 블로그나 포폴 링크 보내주세용
       */}

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
