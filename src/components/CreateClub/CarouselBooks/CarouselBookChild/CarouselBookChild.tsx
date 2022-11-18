import React from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../BookSearchBar/BookSearchBar';

type CarouselBookChildProps = {
  data: NaverBooksDataType;
  width?: number;
  height?: number;
};

const CarouselBookChild = ({
  data,
  width = 40,
  height = 20,
}: CarouselBookChildProps) => {
  return (
    <Div width={width} height={height}>
      <Image src={data.image} />
      <SmallDiv>
        <Title>{data.title}</Title>
        <Author>{data.isbn}</Author>
        <Price>{data.pubdate}</Price>
        {/* <Content>{data.}</Content> */}
      </SmallDiv>
    </Div>
  );
};
export default CarouselBookChild;

const Div = styled.div`
  /* width: 100%; */
  width: ${(props: {width: number}) => props.width}rem;
  height: ${(props: {height: number}) => props.height}rem;
  display: flex;
  padding: 1rem;
  border: 1px solid black;
`;
const SmallDiv = styled.div`
  width: 60%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span``;
const Author = styled.span``;
const Price = styled.span``;
const Content = styled.span``;
const Image = styled.img`
  height: 100%;
`;
