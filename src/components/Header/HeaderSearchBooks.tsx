import React, {ReactNode, useState} from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../types/bookSearch';
import {ClubSearchType} from '../../types/bookSearch';
// import CarouselBooksChild from '../../components/CreateClub/CarouselBooks/CarouselBooksChild/CarouselBooksChild';
import HeaderSearchBooksChild from './HeaderSearchBooksChild';

type CarouselBooksProps = {
  width?: number;
  height?: number;
  pageViewCount?: number;
  data?: ClubSearchType[][];
  ChildComponent?: ReactNode;
  isArrow?: boolean;
  isIndex?: boolean;
};

const HeaderSearchBooks = ({
  data,
  width,
  height,
  ChildComponent,
}: CarouselBooksProps) => {
  const [carouselLocation, setCarouselLocation] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleIndexClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setIsActive(!isActive);
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
                onClick={handleIndexClick}
                isActive={carouselLocation === index}>
                {index + 1}
              </IndexButton>
            );
          })}
        </IndexButtonContainer>
      </CarouselContainer>
    </>
  );
};
export default HeaderSearchBooks;

const CarouselContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  /* border: 1px solid black; */
  @media screen and (max-width: 576px) {
    display: none;
  }
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
  border: 1px solid ${props => props.theme.MainColor};
  background-color: #fff;
  border-bottom: 0;
  border-radius: 1.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  transform: translate(
    ${(props: {carouselLocation: number}) => {
      return -props.carouselLocation * 78.3;
    }}rem
  );
  transition: transform 0.5s;
  align-items: center;
`;

const IndexButtonContainer = styled.div`
  width: 78.3rem;
  height: 4rem;
  display: flex;
  /* justify-content: center; */
  padding-left: 3.2rem;
  background-color: #fff;
  border: 1px solid ${props => props.theme.MainColor};
  border-top: none;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
`;

const IndexButton = styled.button<{isActive?: boolean}>`
  background-color: ${({isActive}) => (isActive ? '#333' : '#999')};
  font-size: 18px;
  margin: 0 1rem;
  height: 2.5rem;
  width: 3rem;
  color: #fff;
  border-radius: 3px;
`;

const ArrowButton = styled.button`
  margin: 1rem;
`;
