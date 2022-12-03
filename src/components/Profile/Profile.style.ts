import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StProfileBox = styled.div`
  display: flex;
  height: 70.5rem;
  width: 97.3rem;
  border-radius: 10px;
  margin: 10.5rem auto;
  padding: 1rem;
  position: relative;
  flex-direction: column;
`;
export const StTitle = styled.div`
  margin-left: 1rem;
  margin-bottom: 3rem;
`;

export const StSpan = styled.span`
  font-size: 2.8rem;
  font-weight: bold;
  margin-left: 2rem;
`;

export const StUserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  margin-right: 1rem;
  background-color: #fff;
  justify-content: space-between;
`;
export const StClubInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;

export const StInfoDiv = styled.div`
  display: flex;
  height: 60.5rem;
  width: 95.3rem;
  border-radius: 10px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const StClubsDiv = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  align-self: flex-end;
  border-radius: 1rem;
  padding: 3rem;
  border: 1px solid ${props => props.theme.MainColor};
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
`;
export const StClubCategory = styled.ul`
  display: flex;
  .on {
    color: black;
    :after {
      content: '';
      display: block;
      border-bottom: 4px solid ${props => props.theme.MainColor};
      margin: 1rem auto;
      transition: all 0.5s;
    }
  }
  li {
    color: ${props => props.theme.Gray};
    margin-right: 2rem;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.5s;
    :after {
      content: '';
      display: block;
      border-bottom: 4px solid white;
      margin: 1rem auto;
    }
  }
`;

export const StClubListWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: space-between;
  flex-direction: column;
`;

export const StClubLi = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;

  div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${props => props.theme.MainColor};
    border-radius: 0.7rem;
    height: 4rem;
    width: 43rem;
    padding: 0 2rem;
    margin-top: 1rem;
    font-size: 1.7rem;
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.MainColor};
    border-radius: 0.7rem;
    height: 4rem;
    width: 13rem;
    padding: 0 2rem;
    margin-top: 1rem;
    font-size: 1.7rem;
  }
  span:nth-child(1) {
    display: flex;
    font-size: 1.5rem;
    overflow: hidden;
  }

  span:nth-child(2) {
    display: flex;
    font-size: 1.5rem;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.MainColor};
    border-radius: 0.7rem;
    height: 4rem;
    width: 13rem;
    padding: 0 2rem;
    margin-top: 1rem;
    font-size: 1.7rem;
    background-color: #fff;
  }
`;

export const StGrayLi = styled(StClubLi)`
  div:nth-child(1) {
    border: 1px solid ${props => props.theme.Gray};
    color: ${props => props.theme.Gray};
  }

  div:nth-child(2) {
    border: 1px solid ${props => props.theme.Gray};
    color: ${props => props.theme.Gray};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.Gray};
    border-radius: 0.7rem;
    height: 4rem;
    width: 13rem;
    padding: 0 2rem;
    margin-top: 1rem;
    font-size: 1.7rem;
    background-color: #fff;
  }
`;

export const StUserDiv = styled.div`
  height: 58%;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 1rem;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  div:nth-child(1) {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    img {
    }
  }
  div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 20%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    p:nth-child(1) {
      font-size: 1.8rem;
      font-weight: bold;
    }
    p:nth-child(2) {
      font-size: 1.6rem;
      color: ${props => props.theme.Gray};
    }
  }
  div:nth-child(3) {
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
      height: 70%;
      border: 1px solid ${props => props.theme.MainColor};
      border-radius: 0.7rem;
      background-color: #fff;
      color: ${props => props.theme.MainColor};
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
`;

export const StChatDiv = styled.div`
  height: 40%;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 1rem;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
  padding: 2rem;

  div:nth-child(1) {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    img {
    }
  }
  div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 20%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p:nth-child(1) {
      font-size: 1.4rem;
      color: ${props => props.theme.Gray};
    }
  }
  div:nth-child(3) {
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
      height: 100%;
      border-radius: 0.7rem;
      background-color: ${props => props.theme.MainColor};
      color: #fff;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
`;
export const StModalDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
