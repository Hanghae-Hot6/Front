import styled from 'styled-components';

export const Div = styled.div`
  display: flex;

  height: 80%;

  position: relative;
  margin: 1rem 0;

  &:hover {
    border: 1px solid ${props => props.theme.Black};
  }
`;

export const Img = styled.img`
  height: 100%;
  margin: auto;
`;
