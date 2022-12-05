import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
const Category = () => {
  // 해당 카테고리 탭이 펼쳐지게
  return (
    <CategorySection>
      <div>
        <LinkSt to={'/club_list'} state={0}>
          인문
        </LinkSt>
        <LinkSt to={'/club_list'} state={1}>
          경영/경제
        </LinkSt>
        <LinkSt to={'/club_list'} state={2}>
          자기계발
        </LinkSt>
        <LinkSt to={'/club_list'} state={3}>
          예술
        </LinkSt>
        <LinkSt to={'/club_list'} state={4}>
          자연과학
        </LinkSt>
        <LinkSt to={'/club_list'} state={5}>
          사회정치
        </LinkSt>
        <LinkSt to={'/club_list'} state={6}>
          IT 모바일
        </LinkSt>
        {/* <LinkSt to={'/club_list'} state={7}>
        소설
      </LinkSt>
      <LinkSt to={'/club_list'} state={8}>
        에세이/시
      </LinkSt> */}
      </div>
    </CategorySection>
  );
};

export default Category;

const CategorySection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media screen and (max-width: 576px) {
    width: 100vw;
    height: 10rem;
    padding-bottom: 15rem;
    overflow-x: scroll;
    overflow-y: hidden;
    /* -ms-overflow-style: none; */
    ::-webkit-scrollbar {
      display: none;
    }
    div {
      margin-left: 40px;
      display: flex;
    }
  }
`;
const LinkSt = styled(Link)`
  display: inline-block;
  font-size: 1.8rem;
  margin-right: 5rem;
  background-color: #f1f1f5;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  line-height: 18rem;
  text-align: center;
`;
