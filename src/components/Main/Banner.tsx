import React, {useEffect, useState} from 'react';
import * as B from './BannerStyled';
// import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri';
import rightArrow from '../../assets/right_arrow.svg';
import leftArrow from '../../assets/left_arrow.svg';
import Banner1 from '../../assets/hero_image.svg';
import Banner2 from '../../assets/hero_2.svg';
import Banner3 from '../../assets/hero_3.svg';
import {Link} from 'react-router-dom';
const banners = [Banner1, Banner2, Banner3];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleNext = () =>
    setActiveIndex(activeIndex => (activeIndex + 1) % banners.length);
  const handlePrev = () =>
    setActiveIndex(
      activeIndex => (activeIndex - 1 + banners.length) % banners.length,
    );
  const handleGoTo = (index: number) => setActiveIndex(index);

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isFocused) {
      intervalId = setInterval(handleNext, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  return (
    <B.Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <B.Container>
        <B.ButtonWrap>
          {banners.length && (
            <B.ArrowButton pos="left" onClick={handlePrev}>
              <img src={leftArrow} alt="leftArrow" />
            </B.ArrowButton>
          )}
          {banners.length && (
            <B.ArrowButton pos="right" onClick={handleNext}>
              <img src={rightArrow} alt="rightArrow" />
            </B.ArrowButton>
          )}
        </B.ButtonWrap>

        <B.CarouselList>
          {banners.map((url, index) => (
            <B.CarouselListItem activeIndex={activeIndex} key={index}>
              <img src={url} alt={url} />

              <div>
                <Link to="/club_list" state={0}>
                  바로가기
                </Link>
                {banners.length && (
                  <B.Nav>
                    {Array.from({length: banners.length}).map((_, index) => (
                      <B.NavItem key={index}>
                        <B.NavButton
                          isActive={activeIndex === index}
                          onClick={() => handleGoTo(index)}
                        />
                      </B.NavItem>
                    ))}
                  </B.Nav>
                )}
              </div>
            </B.CarouselListItem>
          ))}
        </B.CarouselList>
      </B.Container>
    </B.Base>
  );
};

export default Banner;
