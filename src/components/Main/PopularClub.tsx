import React from 'react';
import main1 from '../../assets/main_reco1.svg';
import main2 from '../../assets/main_reco2.svg';
import styled from 'styled-components';
const PopularClub = () => {
  return (
    <PopWrap>
      <PopDiv>
        <img src={main1} alt="main1" />
        <div>
          <p>
            줄거리 어쩌구 저쩌구
            <br /> 작가는 누구고~
          </p>
        </div>
      </PopDiv>
      <PopDiv>
        <img src={main2} alt="main2" />
        <div>
          <p>
            줄거리 어쩌구 저쩌구
            <br /> 작가는 누구고~
          </p>
        </div>
      </PopDiv>
    </PopWrap>
  );
};

export default PopularClub;

const PopWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
  position: relative;
  img {
    cursor: pointer;
  }
`;

const PopDiv = styled.div`
  div {
    opacity: 0;
    border: 1px solid #5200ff;
    background-color: #fff;
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
    width: 50rem;
    height: 20rem;
    position: absolute;
    top: 50%;
    z-index: 12;
    transition: all 0.5s;
    padding: 2rem;
  }
  :hover {
    div {
      opacity: 1;
    }
  }
`;
