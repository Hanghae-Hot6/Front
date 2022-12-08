import styled, {css} from 'styled-components';

export const Base = styled.div`
  /* width: 1910px; */
  /* margin-left: -315px; */
  margin-top: 5rem;
`;

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  div {
    position: relative;
    height: 470px;
    @media screen and (max-width: 576px) {
      height: 45.8rem;
    }
  }
`;

export const ArrowButton = styled.button<{pos: 'left' | 'right'}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  padding: 8px 12px;
  font-size: 48px;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  img {
    width: 5.5rem;
  }
  ${({pos}: {pos: 'left' | 'right'}) =>
    pos === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
`;

export const CarouselList = styled.ul<{
  slidesLength: number;
  transition: string;
  currentIndex: number;
}>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;

  /* overflow: hidden; */
  /* width: 100%; */
  transition: ${({transition}) => transition};
  transform: ${({slidesLength, currentIndex}) =>
    `translateX(${(-100 / slidesLength) * (0 + currentIndex)}%)`};
`;

export const CarouselListItem = styled.li<{
  currCarousel: number;
}>`
  width: 427px;
  /* transform: translateX(-${({currCarousel}) => currCarousel * 100}%); */
  /* position: relative; */
  box-sizing: border-box;
  position: relative;
  :hover {
    img {
      /* filter: blur(2px); */
      /* -webkit-filter: blur(2px); */
      transform: scale(0.95);
      border: 1px solid ${props => props.theme.MainColor};
    }

    > div {
      transform: scale(0.95);
      border: 1px solid ${props => props.theme.MainColor};
      opacity: 1;
      left: 0px;
    }
  }
  img {
    background-color: ${props => props.theme.DarkPurple};
    width: 42.7rem;
    height: 45.8rem;
    object-fit: cover;
    object-position: center;
    transition: all 0.5s ease;
  }
  div {
    opacity: 0;
    position: absolute;
    left: -50px;
    bottom: 10px;
    width: 42.7rem;
    height: 100px;
    background-color: #fff;
    padding: 1rem;
    transition: all 0.5s ease;
    box-sizing: border-box;
  }
  @media screen and (max-width: 576px) {
    div {
      width: 90vw;
    }
    img {
      width: 90vw;
    }
  }
`;

export const NavButton = styled.button<{isActive?: boolean}>`
  width: 4px;
  height: 4px;
  background-color: #000;
  opacity: ${({isActive}) => (isActive ? 0.3 : 0.1)};
`;

export const NavItem = styled.li`
  display: inline-block;
`;

export const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  ${NavItem} + ${NavItem} {
    margin-left: 4px;
  }
`;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  span {
    font-size: 1.6rem;
  }
  span > small {
    color: lightGray;
    margin-left: 5px;
    font-size: 1rem;
  }
`;
export const Writer = styled.span`
  margin-top: 0.7rem;
`;
export const Comment = styled.span``;
