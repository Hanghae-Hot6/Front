import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${props => props.theme.Black};

  font-size: 4rem;
  font-weight: 600;
  margin: 2.8rem 0;
  @media screen and (max-width: 576px) {
    margin-bottom: 2.8rem;
  }
`;
