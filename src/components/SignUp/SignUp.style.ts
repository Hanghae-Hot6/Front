import styled from 'styled-components';

export const StContainer = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; */
`;

export const StCheckBtn = styled.button`
  font-size: 1.4rem;
  height: 2.3rem;
  color: #5200ff;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 20px;
  background-color: white;
  position: absolute;
  right: 0;
  text-align: center;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  width: 40rem;
  height: 6rem;
  color: ${props => props.fontC};
  background-color: ${props => props.theme.MainColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
  @media screen and (max-width: 576px) {
    height: 6rem;
    width: 100%;
  }
`;

export const StModalDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  span {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    h1 {
      font-size: 2rem;
      font-weight: bold;
    }

    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
    }
    div:nth-child(2) {
      display: flex;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;

export const StInputBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 3rem;
  padding: 0 7rem;
  input {
    display: flex;
    text-align: center;
    width: 10%;
    height: 100%;
    border: none;
    border-bottom: 2px solid ${props => props.theme.LightGray};
    font-size: 1.8rem;
    font-weight: bold;
    :focus {
      outline: none;
    }
  }

  .On {
    border-bottom: 2px solid ${props => props.theme.MainColor};
  }
`;
