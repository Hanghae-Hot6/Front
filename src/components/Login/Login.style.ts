import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const StLoginDivier = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin: 0 0;
  font-size: 1.8rem;
  margin-bottom: 4.3rem;
  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 0.1rem;
    font-size: 0;
    line-height: 0;
    margin: 0 1.6rem;
  }
`;

export const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  display: flex;
  width: 40rem;
  height: 6rem;
  color: ${({fontC}) => fontC};
  background-color: ${({bgColor}) => bgColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 576px) {
    height: 6rem;
    width: 100%;
  }
  img {
    transform: scale(0.8);
    margin-right: 1rem;
  }
`;

export const StSmallBtnContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const StSmallNavBtn = styled.button<{
  fontC?: string | undefined;
}>`
  color: ${({fontC}) => fontC};
  background-color: white;
  color: #767676;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;
  width: 33%;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;
