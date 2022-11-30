import React, {useEffect, useRef, useState} from 'react';
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
  const itemsSize = banners.length;
  const addItems = 3;
  let slides = setSlides(addItems);

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [transition, setTransition] = useState('');
  const slidesLength = slides.length;
  const transitionTime = 500;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const [isBtnActive, setIsBtnActive] = useState(false);

  const handleSwipe = (direction: number) => {
    setIsBtnActive(true);

    setTimeout(() => {
      setIsBtnActive(false);
    }, 500);

    let index = currentIndex + direction;
    setCurrentIndex(index);

    // 여기는 replaceSlide함수와 더불어서 배열의 중간에서 만 존재할 수 있도록 설정하는 조건
    if (index < addItems) {
      index += itemsSize;
      replaceSlide(index);
    } else if (index >= itemsSize + addItems) {
      index -= itemsSize;
      replaceSlide(index);
    }

    setTransition(transitionStyle);
  };

  function setSlides(addItems: number) {
    let addedFront = [];
    let addedLast = [];
    var index = 0;
    while (index < addItems) {
      addedLast.push(banners[index % banners.length]); // 0 1 2 인덱스 순으로 push
      addedFront.unshift(
        banners[banners.length - 1 - (index % banners.length)],
      ); // 2 1 0 인덱스 순으로 unshift
      index++;
    }

    //앞뒤로 3개씩 추가 된다. -3 -2 -1 / 0 1 2 / 3 4 5 총 9개
    return [...addedFront, ...banners, ...addedLast];
  }

  function getItemIndex(index: number) {
    // slide가 추가 되었기 때문에 원래 배열의 크기로 index를 설정해줘야 함 / 3개니까 0 1 2
    index -= addItems;

    if (index < 0) {
      index += itemsSize;
    } else if (index >= itemsSize) {
      index -= itemsSize;
    }

    return index;
  }

  function replaceSlide(index: number) {
    setTimeout(() => {
      setTransition('');
      setCurrentIndex(index);
    }, transitionTime);
  }

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    // if (!isMouseIn) {
    //   intervalId = setInterval(() => handleSwipe(1), 3000);
    //   console.log(currentIndex);
    // }
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [isMouseIn]);

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    setTransition(transitionStyle);
  };

  // const handleGoTo = (index: number) => setCurrCarousel(index);

  return (
    <C.Base>
      <C.Container>
        {banners.length && (
          <C.ArrowButton
            pos="left"
            onClick={() => handleSwipe(-1)}
            disabled={isBtnActive}>
            <img src={leftArrow} alt="leftArrow" />
          </C.ArrowButton>
        )}
        <div>
          <C.CarouselList
            className="slider-track"
            slidesLength={slidesLength}
            currentIndex={currentIndex}
            transition={transition}>
            {slides.map((url, slideIndex) => {
              const itemIndex = getItemIndex(slideIndex);
              return (
                <C.CarouselListItem
                  key={slideIndex}
                  className={`slider-item ${
                    currentIndex === slideIndex ? 'current-slide' : ''
                  }`}
                  currCarousel={currentIndex}>
                  <img src={banners[itemIndex]} alt={banners[itemIndex]} />
                  <div>후기입니다</div>
                </C.CarouselListItem>
              );
            })}
          </C.CarouselList>
        </div>
        {banners.length && (
          <C.ArrowButton
            pos="right"
            onClick={() => handleSwipe(1)}
            disabled={isBtnActive}>
            <img src={rightArrow} alt="rightArrow" />
          </C.ArrowButton>
        )}
      </C.Container>
      {banners.length && (
        <C.Nav>
          {Array.from({length: banners.length}).map((_, index) => {
            let idx = currentIndex - addItems;

            if (idx < 0) {
              idx += itemsSize;
            } else if (idx >= itemsSize) {
              idx -= itemsSize;
            }

            return (
              <C.NavItem key={index}>
                <C.NavButton
                  isActive={idx === index}
                  onClick={() => {
                    handleGoTo(index + 3);
                  }}
                />
              </C.NavItem>
            );
          })}
        </C.Nav>
      )}
    </C.Base>
  );
};

export default Carousel;
