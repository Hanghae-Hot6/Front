import React, {useState} from 'react';
import styled from 'styled-components';
import {ClubSearchType} from '../../types/bookSearch';
import {Link} from 'react-router-dom';
type CarouselBooksChildProps = {
  data: ClubSearchType[] | undefined;
  width?: number;
  height?: number;
};

// type CarouselBookChildProps = {
//   data: NaverBooksDataType;
//   width?: number;
//   height?: number;
// };
const HeaderSearchBooksChild = ({
  data,
  width = 40,
  height = 20,
}: CarouselBooksChildProps) => {
  return (
    <Div width={width} height={height}>
      {data &&
        data?.map((val, index) => {
          return (
            <Wrap key={index}>
              <Box width={width} height={height}>
                <LeftDiv>
                  {val && <Image src={val?.thumbnail} />}
                  <SmallDiv>
                    <Title>{val?.clubName}</Title>
                    {/* <Author>{data?.isbn}</Author> */}
                    <Text>{val?.category}</Text>
                    {/* <Content>{data.}</Content> */}
                  </SmallDiv>
                </LeftDiv>
              </Box>

              {val && (
                <RightBox className="on">
                  <div>
                    <img src={val?.thumbnail} alt={val?.clubName} />
                    <TitleWrap>
                      <Title>{val?.clubName}</Title>
                      <div>
                        <Text>{val?.category}</Text>
                        <Text>모임장 : {val?.leader}</Text>
                        <Text>
                          모임 기간 : {val?.startDate} ~ {val?.finishDate}
                        </Text>
                        <Text>모임 장소 : {val?.location}</Text>
                        <Link to={`/club_detail/${val.clubId}`}>
                          모임 바로가기
                        </Link>
                      </div>
                    </TitleWrap>
                  </div>
                  <TextWrap>
                    <p>{val?.summary}</p>
                  </TextWrap>
                </RightBox>
              )}
            </Wrap>
          );
        })}
    </Div>
  );
};
export default HeaderSearchBooksChild;

const Div = styled.div<{width: number; height: number}>`
  width: ${(props: {width: number}) => props.width}rem;
  height: ${(props: {height: number}) => props.height}rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
const Wrap = styled.div`
  width: 50rem;
  height: 20rem;
  :hover > .on {
    display: block;
  }
`;
const RightBox = styled.div`
  display: none;
  position: absolute;
  top: 10%;
  right: 5%;
  transition: all 0.5s;
  > div {
    display: flex;
  }
  > div > img {
    width: 14.8rem;
    height: 21.6rem;
    filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
    object-fit: cover;
  }
`;
const TextWrap = styled.div`
  padding: 10px 24px;
  margin-top: 2.4rem;
  width: 40rem;
  height: 9.4rem;
  background: #f1f1f5;
  border-radius: 7px;
  > p {
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;
const Box = styled.div<{width: number; height: number}>`
  /* width: 100%; */
  width: 50rem;
  height: 12rem;
  display: flex;
  padding: 1rem;
  /* margin-bottom: 1rem; */
  margin-left: 3rem;
  margin-top: 1rem;
  /* border: 1px solid black; */
  /* background-color: #333; */
`;
const SmallDiv = styled.div`
  width: 60%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 15rem;
  margin-bottom: 1rem;
`;
const Text = styled.span``;
const Image = styled.img`
  width: 8.8rem;
  height: 10rem;
  filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
  object-fit: cover;
`;
const TitleWrap = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    gap: 0.9rem;
  }
  margin-left: 1.5rem;
  margin-top: 1rem;
`;
const LeftDiv = styled.div`
  display: flex;
  position: relative;
  width: 40rem;
`;
