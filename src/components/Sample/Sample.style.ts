import styled from 'styled-components';

export const Section = styled.section`
  width: 200px;
`;
export const H1 = styled.h1<{fontSize: number; fontWeight: number}>`
  color: ${props => props.theme.LightPurple};
  font-size: ${({fontSize}) => fontSize}rem;
  font-weight: ${({fontWeight}) => fontWeight}rem;
`;
