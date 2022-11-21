import React, {ReactNode, useState} from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../BookSearchBar/BookSearchBar';

import CarouselBooksChild from './CarouselBooksChild/CarouselBooksChild';

type CarouselBooksProps = {
  width?: number;
  height?: number;
  pageViewCount?: number;
  data?: NaverBooksDataType[][];
  ChildComponent?: ReactNode;
  isArrow?: boolean;
  isIndex?: boolean;
};

const CarouselBooks = ({
  data,
  width,
  height,
  ChildComponent,
}: CarouselBooksProps) => {
  const [carouselLocation, setCarouselLocation] = useState<number>(0);

  const handleIndexClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (e.currentTarget.dataset.index) {
      setCarouselLocation(parseInt(e.currentTarget.dataset.index));
    }
  };

  return (
    <>
      <CarouselContainer>
        <FlexDiv>
          <Container width={width} height={height}>
            <Content carouselLocation={carouselLocation}>
              {data?.map((val, index) => {
                return (
                  <CarouselBooksChild
                    key={index}
                    data={val}
                    width={width}
                    height={height}
                  />
                );
              })}
            </Content>
          </Container>
        </FlexDiv>
        <IndexButtonContainer>
          {data?.map((__, index) => {
            return (
              <IndexButton
                key={index}
                data-index={index}
                onClick={handleIndexClick}></IndexButton>
            );
          })}
        </IndexButtonContainer>
      </CarouselContainer>
    </>
  );
};
export default CarouselBooks;

const CarouselContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{
  width: number | undefined;
  height: number | undefined;
}>`
  display: flex;
  width: ${(props: {width?: number}) => props.width}rem;
  height: ${(props: {height?: number}) => props.height}rem;
  /* width: 100%; */
  /* height: 100%; */
  overflow: hidden;
  border: 1px solid black;
`;

const Content = styled.div`
  display: flex;
  transform: translate(
    ${(props: {carouselLocation: number}) => {
      return -props.carouselLocation * 40;
    }}rem
  );
  transition: transform 0.5s;
`;

const IndexButtonContainer = styled.div`
  width: 30rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndexButton = styled.button`
  background-color: ${(props: any) => props.theme.Gray};
  font-size: 22px;
  margin: 0 1rem;
  height: 1rem;
  width: 3rem;
`;

const ArrowButton = styled.button`
  margin: 1rem;
`;
