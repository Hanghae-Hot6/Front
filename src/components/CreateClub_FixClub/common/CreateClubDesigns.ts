import styled from 'styled-components';

export const CreateClubButton = styled.button`
  padding: 0.4rem 1.2rem;
  border-radius: 1.35rem;
  background-color: transparent;
  color: ${props => props.theme.MainColor};
  border: 1px solid ${props => props.theme.MainColor};
  @media screen and (max-width: 430px) {
    font-size: 1rem;
  }
`;
