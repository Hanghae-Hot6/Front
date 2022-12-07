import React, {ReactNode, useState} from 'react';
import {Link} from 'react-router-dom';
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

function HeaderSliderSearchBooks({
  data,
  width,
  height,
  ChildComponent,
}: CarouselBooksProps) {
  const [carouselLocation, setCarouselLocation] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleIndexClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setIsActive(!isActive);
    if (e.currentTarget.dataset.index) {
      setCarouselLocation(parseInt(e.currentTarget.dataset.index));
    }
  };

  const newData = data && data[0];

  console.log(newData);

  return (
    <>
      <FlexDiv>
        <Container width={width} height={height}>
          <Content carouselLocation={carouselLocation}>
            {data?.map((val, index) => {
              return (
                <>
                  <HeaderSearchBooksChild
                    key={index}
                    data={val}
                    width={width}
                    height={height}
                  />
                </>
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
    </>
  );
}

export default HeaderSliderSearchBooks;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 576px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 90%;
    width: 100%;
    overflow: hidden;
  }
`;

const Container = styled.div<{
  width: number | undefined;
  height: number | undefined;
}>`
  display: flex;
  width: ${(props: {width?: number}) => props.width}rem;
  height: ${(props: {height?: number}) => props.height}rem;
  align-items: center;
  @media screen and (max-width: 576px) {
    height: 100%;
    width: 100%;
    align-items: flex-start;
    overflow: hidden;
  }
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
  @media screen and (max-width: 576px) {
    transform: translate(
      ${(props: {carouselLocation: number}) => {
        return -props.carouselLocation * 55;
      }}rem
    );
  }
`;

const IndexButtonContainer = styled.div`
  width: 78.3rem;
  height: 4rem;
  display: flex;
  /* justify-content: center; */
  padding-left: 3.2rem;
  background-color: #fff;
  /* border: 1px solid ${props => props.theme.MainColor}; */
  border-top: none;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  @media screen and (max-width: 576px) {
    width: 90vw;
  }
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
