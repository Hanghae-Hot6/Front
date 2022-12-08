import React, {useEffect, useRef, useState} from 'react';
import * as C from './CarouselStyled';
// import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri';
import rightArrow from '../../assets/arrow_right.svg';
import leftArrow from '../../assets/arrow_left.svg';
import {useQuery} from 'react-query';
import {reviewApis} from '../../api/axiosConfig';
import {Link} from 'react-router-dom';
import Thumb from '../../assets/thumbnail_default.png';
type review = {
  clubId: number;
  reviewList: [];
  thumbnail: string;
};

const Carousel = () => {
  const {data} = useQuery(['getAllReview'], async () => {
    const response = await reviewApis.getAllReview();
    return response.data.data;
  });
  // const newBanners =
  //   data &&
  //   data.map((item: review) => {
  //     return item.thumbnail;
  //   });

  const newBanners = data;

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [transition, setTransition] = useState('');

  const itemsSize = newBanners?.length;
  const addItems = 3;
  let slides = setSlides(addItems);

  const slidesLength = slides?.length;
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

    //   // 여기는 replaceSlide함수와 더불어서 배열의 중간에서 만 존재할 수 있도록 설정하는 조건
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
      newBanners && addedLast.push(newBanners[index % newBanners.length]); // 0 1 2 인덱스 순으로 push
      newBanners &&
        addedFront.unshift(
          newBanners[newBanners?.length - 1 - (index % newBanners?.length)],
        ); // 2 1 0 인덱스 순으로 unshift
      index++;
    }

    //   //   //앞뒤로 3개씩 추가 된다. -3 -2 -1 / 0 1 2 / 3 4 5 총 9개

    return data && [...addedFront, ...newBanners, ...addedLast];
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
  }, [isMouseIn]);

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    setTransition(transitionStyle);
  };

  return (
    <>
      {data && (
        <C.Base>
          <C.Container>
            {newBanners.length && (
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
                {slides?.map((slide: number, index: number) => {
                  const itemIndex = getItemIndex(index);
                  return (
                    <C.CarouselListItem
                      key={index}
                      className={`slider-item ${
                        currentIndex === index ? 'current-slide' : ''
                      }`}
                      currCarousel={currentIndex}>
                      <Link
                        to={`/club_detail/${newBanners[itemIndex]?.clubId}`}>
                        {/* <img
                          src={newBanners[itemIndex]?.thumbnail}
                          alt={newBanners[itemIndex]?.thumbnail}
                        /> */}
                        {newBanners[itemIndex].thumbnail === null ? (
                          <img src={Thumb} alt="클럽 썸네일 이미지" />
                        ) : (
                          <img
                            src={newBanners[itemIndex]?.thumbnail}
                            alt={newBanners[itemIndex]?.thumbnail}
                          />
                        )}
                      </Link>

                      <C.Review>
                        <C.Writer>
                          {newBanners[itemIndex]?.reviewList[0].memberId}
                          <small>
                            {newBanners[
                              itemIndex
                            ]?.reviewList[0].createdAt.split('T', 1)}
                          </small>
                        </C.Writer>
                        <C.Comment>
                          {newBanners[itemIndex]?.reviewList[0].comment}
                        </C.Comment>
                      </C.Review>
                    </C.CarouselListItem>
                  );
                })}
              </C.CarouselList>
            </div>
            {newBanners.length && (
              <C.ArrowButton
                pos="right"
                onClick={() => handleSwipe(1)}
                disabled={isBtnActive}>
                <img src={rightArrow} alt="rightArrow" />
              </C.ArrowButton>
            )}
          </C.Container>
          {newBanners.length && (
            <C.Nav>
              {Array.from({length: newBanners.length}).map((_, index) => {
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
      )}
    </>
  );
};

export default Carousel;
