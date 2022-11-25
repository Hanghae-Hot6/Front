import React, {useState} from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../../types/bookSearch';
import PaginationBooksChild from './PaginationBooksChild';

type PaginationBooksProps = {
  borderWidth?: number;
  borderHeight?: number;

  data?: NaverBooksDataType[][];
};

// pagination books
// width height 을 숫자로 받음 rem으로만 받음

const PaginationBooks = ({
  data,
  borderWidth = 80,
  borderHeight = 40,
}: PaginationBooksProps) => {
  const [carouselLocation, setCarouselLocation] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleIndexClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setIsActive(!isActive);
    if (e.currentTarget.dataset.index) {
      setCarouselLocation(parseInt(e.currentTarget.dataset.index));
    }
  };

  const fakeData: NaverBooksDataType[][] = [
    [
      {
        image: '',
        isbn: 'sdf',
        pubdate: 'sdf',
        title: 'sdf',
        description: 'sdf',
      },
      {
        image: '',
        isbn: 'sdf',
        pubdate: 'sdf',
        title: 'sdf',
        description: 'sdf',
      },
      {
        image: '',
        isbn: 'sdf',
        pubdate: 'sdf',
        title: 'sdf',
        description: 'sdf',
      },
    ],
    [
      {
        image: '',
        isbn: 'sdf',
        pubdate: 'sdf',
        title: 'sdf',
        description: 'sdf',
      },
      {
        image: '',
        isbn: 'sdf',
        pubdate: 'sdf',
        title: 'sdf',
        description: 'sdf',
      },
      {
        image: '',
        isbn: 'sdf',
        pubdate: 'sdf',
        title: 'sdf',
        description: 'sdf',
      },
    ],
  ];

  return (
    <>
      <CarouselContainer borderWidth={borderWidth} borderHeight={borderHeight}>
        <Container2>
          <ContentContainer>
            <Content carouselLocation={carouselLocation} width={borderWidth}>
              {data?.map((val, index) => {
                return (
                  <PaginationBooksChild
                    key={index}
                    data={val}
                    borderWidth={borderWidth}
                    borderHeight={borderHeight}
                  />
                );
              })}
            </Content>
          </ContentContainer>
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
        </Container2>
        <Container3></Container3>
      </CarouselContainer>
    </>
  );
};
export default PaginationBooks;

const CarouselContainer = styled.div<{
  borderWidth: number;
  borderHeight: number;
}>`
  display: flex;

  justify-content: center;
  align-items: center;

  width: ${({borderWidth: width}) => width}rem;
  height: ${({borderHeight: height}) => height}rem;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  overflow: hidden;
  /* border: 2px solid ${props => props.theme.MainColor}; */
  background-color: #fff;
  /* align-items: center; */
`;

const Container2 = styled.div`
  width: 45%;
  height: 90%;
`;

const Container3 = styled.div`
  width: 45%;
  height: 90%;

  /* border: 1px solid black; */
`;

const Content = styled.div`
  display: flex;
  transform: translate(
    ${(props: {carouselLocation: number; width: number}) => {
      console.log(props.carouselLocation);
      return `${-props.carouselLocation * 0.45 * props.width}rem`;
    }}
  );
  transition: transform 0.5s;
  align-items: center;
`;

const IndexButtonContainer = styled.div`
  width: 100%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  /* border: 1px solid ${props => props.theme.MainColor}; */
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
