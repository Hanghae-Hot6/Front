import styled from 'styled-components';

export const Div = styled.div`
  display: flex;

  height: 80%;

  position: relative;
  margin: 1rem 0;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.03);
  }
`;

export const Img = styled.img`
  height: 100%;
  margin: auto;
`;
