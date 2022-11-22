import React, {ReactNode, useState} from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../components/CreateClub/BookSearchBar/BookSearchBar';
// import CarouselBooksChild from '../../components/CreateClub/CarouselBooks/CarouselBooksChild/CarouselBooksChild';
import HeaderSearchBooksChild from './HeaderSearchBooksChild';

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
                  <HeaderSearchBooksChild
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
                onClick={handleIndexClick}>
                {index + 1}
              </IndexButton>
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
  position: absolute;
  top: 0;
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
  background-color: aliceblue;
`;

const Content = styled.div`
  display: flex;
  transform: translate(
    ${(props: {carouselLocation: number}) => {
      return -props.carouselLocation * 42;
    }}rem
  );
  transition: transform 0.5s;
`;

const IndexButtonContainer = styled.div`
  width: 42rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #111;
  border-top: none;
`;

const IndexButton = styled.button`
  background-color: ${(props: any) => props.theme.Gray};
  font-size: 18px;
  margin: 0 1rem;
  height: 2.5rem;
  width: 3rem;
  color: #fff;
`;

const ArrowButton = styled.button`
  margin: 1rem;
`;
