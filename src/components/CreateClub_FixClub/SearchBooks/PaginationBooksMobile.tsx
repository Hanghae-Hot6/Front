import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../../types/bookSearch';
import PaginationBooksChildMobile from './PaginationBooksChildMobile';

type PaginationBooksMobileProps = {
  borderWidth?: number;
  borderHeight?: number;
  widthPortion?: number;
  data?: NaverBooksDataType[][];
};

const PaginationBooksMobile = ({
  data,
  borderWidth = 80,
  borderHeight = 40,
}: // widthPortion = 45,
PaginationBooksMobileProps) => {
  const [carouselLocation, setCarouselLocation] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleIndexClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setIsActive(!isActive);
    if (e.currentTarget.dataset.index) {
      setCarouselLocation(parseInt(e.currentTarget.dataset.index));
    }
  };

  const handleArrowClick = () => {};

  return (
    <>
      <CarouselContainer borderWidth={borderWidth} borderHeight={borderHeight}>
        <Container2>
          <ContentContainer id="yes">
            <div style={{position: 'relative'}}>
              <Content
                id="parent"
                dataLength={6}
                carouselLocation={carouselLocation}
                width={borderWidth}>
                {data?.map((val, index) => {
                  // if (index !== 1) return;

                  return (
                    <PaginationBooksChildMobile
                      key={index}
                      data={val}
                      dataLength={data.length}
                      borderWidth={borderWidth}
                      borderHeight={borderHeight}
                    />
                  );
                })}
              </Content>
            </div>
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
        {/* <Container3></Container3> */}
      </CarouselContainer>
    </>
  );
};
export default PaginationBooksMobile;

const CarouselContainer = styled.div<{
  borderWidth: number;
  borderHeight: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({borderWidth: width}) => width}rem;
  height: ${({borderHeight: height}) => height}rem;
  /* border: 2px solid black; */
`;

const Container2 = styled.div`
  width: 100%;
  height: 90%;
`;
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 86%;
  overflow: hidden;
  background-color: #fff;
  /* border: 1px solid green; */
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  transform: translate(
    ${(props: {
      dataLength: number;
      carouselLocation: number;
      width: number;
    }) => {
      console.log(props.dataLength);
      return `${(-props.carouselLocation * 100) / props.dataLength}%`;
    }}
  );

  transition: transform 0.5s;
  align-items: center;
`;

const IndexButtonContainer = styled.div`
  width: 100%;
  height: 16%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
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
