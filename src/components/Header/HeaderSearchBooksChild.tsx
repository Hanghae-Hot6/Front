import React from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../components/CreateClub/BookSearchBar/BookSearchBar';
import HeaderBookChild from './HeaderBookChild';

type CarouselBooksChildProps = {
  data: NaverBooksDataType[] | undefined;
  width?: number;
  height?: number;
};

const CarouselBooksChild = ({
  data,
  width = 40,
  height = 20,
}: CarouselBooksChildProps) => {
  return (
    <Div width={width} height={height}>
      {data?.map((val, index) => {
        return (
          <HeaderBookChild key={index} data={val} width={20} height={10} />
        );
      })}
    </Div>
  );
};
export default CarouselBooksChild;

const Div = styled.div<{width: number; height: number}>`
  width: ${(props: {width: number}) => props.width}rem;
  height: ${(props: {height: number}) => props.height}rem;
  display: flex;
  flex-direction: column;
`;
