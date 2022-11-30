import styled from 'styled-components';

export const StContainer = styled.div``;

export const StCheckBtn = styled.button`
  display: flex;
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

export const StNavBtn = styled.button<{fontC: string; bgColor: string}>`
  width: 40rem;
  height: 6rem;
  color: ${props => props.fontC};
  background-color: ${props => props.theme.MainColor};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4.3rem;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
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

    /* input {
      border: 1px solid ${props => props.theme.MainColor};
      height: 3rem;
    }
     */
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
    border-bottom: 1px solid ${props => props.theme.LightGray};
    font-size: 1.8rem;
    font-weight: bold;
    :focus {
      outline: none;
    }
  }

  .On {
    border-bottom: 1px solid ${props => props.theme.MainColor};
  }
`;
