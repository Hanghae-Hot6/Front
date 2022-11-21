import React, {useState} from 'react';
import * as C from './CarouselStyled';
// import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri';
import rightArrow from '../../assets/right_arrow.svg';
import leftArrow from '../../assets/left_arrow.svg';

const Carousel = () => {
  const banners = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1574&q=80',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  ];
  const [currCarousel, setCurrCarousel] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 500ms ease-in-out',
  );

  // banner 앞뒤에 눈속임 배너 추가해주기
  const makeNewDataArray = (banners: string[]) => {
    // const dataStart = banners[0];
    // const dataMiddle = banners[1];
    // const dataEnd = banners[banners.length - 1];
    // 2 0 1 2 0 1
    const modifiedArray = [...banners, ...banners, ...banners];
    return modifiedArray;
  };

  const newArray = makeNewDataArray(banners);
  // const moveToNthSlide = (n: number) => {
  //   setCurrCarousel(n);
  // };
  const moveToNthSlide = (n: number) => {
    setTimeout(() => {
      setCarouselTransition('');
      setCurrCarousel(n);
    }, 500);
  };
  const slideNextSoulsCarousel = () => {
    const soulSliderLength = banners.length;
    const newCurr = currCarousel + 1;
    setCurrCarousel(newCurr);
    if (newCurr === soulSliderLength) {
      moveToNthSlide(0);
    }
  };

  const slidePrevSoulsCarousel = () => {
    //   3
    const soulSliderLength = banners.length;
    const newCurr = currCarousel - 1;
    setCurrCarousel(newCurr);
    if (newCurr === -1) {
      moveToNthSlide(soulSliderLength - 1);
    }
  };

  const handleGoTo = (index: number) => setCurrCarousel(index);

  return (
    <C.Base>
      <C.Container>
        {banners.length && (
          <C.ArrowButton pos="left" onClick={slidePrevSoulsCarousel}>
            <img src={leftArrow} alt="leftArrow" />
          </C.ArrowButton>
        )}
        <C.CarouselList>
          {newArray.map((url, index) => (
            <C.CarouselListItem
              key={index}
              // className={}
              style={{
                transform: `translateX(-${currCarousel * 100}%)`,
              }}>
              <img src={url} alt={url} />
            </C.CarouselListItem>
          ))}
        </C.CarouselList>
        {banners.length && (
          <C.ArrowButton pos="right" onClick={slideNextSoulsCarousel}>
            <img src={rightArrow} alt="rightArrow" />
          </C.ArrowButton>
        )}
      </C.Container>
      {banners.length && (
        <C.Nav>
          {Array.from({length: banners.length}).map((_, index) => (
            <C.NavItem key={index}>
              <C.NavButton
                isActive={currCarousel === index}
                onClick={() => handleGoTo(index)}
              />
            </C.NavItem>
          ))}
        </C.Nav>
      )}
    </C.Base>
  );
};

export default Carousel;
