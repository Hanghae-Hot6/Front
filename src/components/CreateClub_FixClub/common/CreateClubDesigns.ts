import styled from 'styled-components';

export const CreateClubButton = styled.button`
  /* width: 7.7rem; */
  /* height: 2.7rem; */
  padding: 0.4rem 1.2rem;

  border-radius: 1.35rem;
  background-color: transparent;
  color: ${props => props.theme.MainColor};
  border: 1px solid ${props => props.theme.MainColor};
`;
