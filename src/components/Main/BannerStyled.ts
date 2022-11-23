import styled, {css} from 'styled-components';

export const Base = styled.div`
  /* width: 1910px; */
  /* margin-left: -315px; */
  margin-top: 100px;
`;

export const Container = styled.div`
  position: relative;
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
  ${({pos}: {pos: 'left' | 'right'}) =>
    pos === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
`;

export const CarouselList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
`;

export const CarouselListItem = styled.li<{activeIndex: number}>`
  width: 1910px;
  flex: 1 0 100%;
  transform: translateX(
    -${({activeIndex}: {activeIndex: number}) => activeIndex * 100}%
  );
  transition: 200ms ease;
  position: relative;
  > img {
    width: 100%;
    height: 458px;
    object-fit: cover;
    object-position: center;
  }
  > div {
    margin: 0 auto;
    width: 53%;
    background-color: #fff;
    position: relative;
    > a {
      width: 9.6rem;
      height: 4.2rem;
      line-height: 4.2rem;
      background-color: #111;
      color: #fff;
      position: absolute;
      z-index: 12;
      display: block;
      bottom: 10rem;
      left: 0;
      font-size: 2rem;
      padding-left: 1.3rem;
    }
  }
`;

export const NavButton = styled.button<{isActive?: boolean}>`
  width: 22px;
  height: 3px;
  background-color: #fff;
  opacity: ${({isActive}) => (isActive ? 0.8 : 0.3)};
`;

export const NavItem = styled.li`
  display: inline-block;
`;

export const Nav = styled.ul`
  position: absolute;
  z-index: 12;
  bottom: 6.4rem;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  ${NavItem} + ${NavItem} {
    margin-left: 4px;
  }
`;

export const ButtonWrap = styled.div`
  width: 1280px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10;
`;
