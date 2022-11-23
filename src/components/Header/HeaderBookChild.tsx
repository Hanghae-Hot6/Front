import {log} from 'console';
import React from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../types/bookSearch';

type CarouselBookChildProps = {
  data: NaverBooksDataType;
  width?: number;
  height?: number;
};

const HeaderBookChild = ({
  data,
  width = 40,
  height = 20,
}: CarouselBookChildProps) => {
  return (
    <Div width={width} height={height}>
      <Image src={data?.image} />
      <SmallDiv>
        <Title>{data?.title}</Title>
        {/* <Author>{data?.isbn}</Author> */}
        <Price>{data?.pubdate}</Price>
        {/* <Content>{data.}</Content> */}
      </SmallDiv>
    </Div>
  );
};
export default HeaderBookChild;

const Div = styled.div<{width: number; height: number}>`
  /* width: 100%; */
  width: ${(props: {width: number}) => props.width}rem;
  height: ${(props: {height: number}) => props.height}rem;
  display: flex;
  padding: 1rem;
  /* margin-bottom: 1rem; */
  margin-left: 3rem;
  margin-top: 1rem;
  /* border: 1px solid black; */
`;
const SmallDiv = styled.div`
  width: 60%;
  padding: 2rem;
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
const Author = styled.span``;
const Price = styled.span``;
const Content = styled.span``;
const Image = styled.img`
  width: 8.8rem;
  height: 10rem;
  filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
`;
