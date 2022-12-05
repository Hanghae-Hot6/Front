import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import icon1 from '../../assets/icon1.svg';
import icon2 from '../../assets/icon2.svg';
import icon3 from '../../assets/icon3.svg';
import icon4 from '../../assets/icon4.svg';
import icon5 from '../../assets/icon5.svg';
import icon6 from '../../assets/icon6.svg';
import icon7 from '../../assets/icon7.svg';
const Category = () => {
  // 해당 카테고리 탭이 펼쳐지게
  return (
    <CategorySection>
      <div>
        <LinkSt to={'/club_list'} state={0}>
          <img src={icon1} alt="icon1" />
          인문
        </LinkSt>
        <LinkSt to={'/club_list'} state={1}>
          <img src={icon2} alt="icon2" />
          경영/경제
        </LinkSt>
        <LinkSt to={'/club_list'} state={2}>
          <img src={icon3} alt="icon3" />
          자기계발
        </LinkSt>
        <LinkSt to={'/club_list'} state={3}>
          <img src={icon4} alt="icon4" />
          예술
        </LinkSt>
        <LinkSt to={'/club_list'} state={4}>
          <img src={icon5} alt="icon5" />
          자연과학
        </LinkSt>
        <LinkSt to={'/club_list'} state={5}>
          <img src={icon6} alt="icon6" />
          사회정치
        </LinkSt>
        <LinkSt to={'/club_list'} state={6}>
          <img src={icon7} alt="icon7" />
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
    width: 90vw;
    height: 15rem;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
    div {
      margin-left: 180px;
      padding-left: 120px;
      display: flex;
    }
  }
`;
const LinkSt = styled(Link)`
  display: inline-block;
  font-size: 1.8rem;
  margin-right: 5rem;
  width: 7rem;
  height: 7rem;
  line-height: 3rem;
  text-align: center;
  > img {
    width: 100%;
    height: 100%;
  }
`;
