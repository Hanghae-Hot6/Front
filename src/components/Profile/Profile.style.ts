import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
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
  @media screen and (max-width: 576px) {
    width: 100%;
    /* height: 100%; */
    height: 100rem;

    margin: 0 auto;
  }
`;
export const StTitle = styled.div`
  margin-left: 1rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 576px) {
    margin-left: 0;
    margin-bottom: 1rem;

    img {
      display: none;
    }
  }
`;

export const StSpan = styled.span`
  font-size: 2.8rem;
  font-weight: bold;
  margin-left: 2rem;
  @media screen and (max-width: 576px) {
    margin-left: 0;
  }
`;

export const StUserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  margin-right: 1rem;
  background-color: #fff;
  justify-content: space-between;
  @media screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
    height: 20rem;
  }
`;
export const StClubInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
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
  @media screen and (max-width: 576px) {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
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
  @media screen and (max-width: 576px) {
    border: 0;
    padding: 0;
    box-shadow: none;
  }
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

export const StUl = styled.ul`
  height: 100%;
`;
export const StClubLi = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  @media screen and (max-width: 576px) {
    position: relative;
  }
  a {
    @media screen and (max-width: 576px) {
      width: 100%;
      height: 6.5rem;
      padding: 0 2rem;
      margin-top: 1rem;
    }
  }

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

    @media screen and (max-width: 576px) {
      width: 100%;
      height: 6.5rem;
      margin-top: 0;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-right: 13rem;
      overflow: hidden;
    }
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
    @media screen and (max-width: 576px) {
      position: absolute;
      margin: 2.5rem 2rem 0 0;
      padding: 0;
      border: 0;
      right: 0;
      width: 13rem;
      height: auto;
      transform: translate(0, 50%);
      color: ${props => props.theme.MainColor};
    }
  }
  span:nth-child(1) {
    display: block;
    font-size: 1.5rem;
    width: 19rem;
    height: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 576px) {
      margin: 0.5rem 0 0 0;
      align-items: center;
      display: block;
      width: 100%;
      height: 50%;
      line-height: 2.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  span:nth-child(2) {
    display: flex;
    white-space: nowrap;
    font-size: 1.5rem;
    width: 18rem;
    @media screen and (max-width: 576px) {
      margin: 0 0 0.5rem 0;
      display: block;
      width: 100%;
      height: 50%;
      line-height: 2.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
    @media screen and (max-width: 576px) {
      position: absolute;
      margin: 2.5rem 2.1rem 0 0;
      padding: 0;
      border: 0;
      right: 0;
      width: 13rem;
      height: 1.7rem;
      transform: translate(0, 50%);
    }
  }
`;

export const StGrayLi = styled(StClubLi)`
  div:nth-child(1) {
    border: 1px solid ${props => props.theme.Gray};
    color: ${props => props.theme.Gray};
    @media screen and (max-width: 576px) {
      width: 100%;
      height: 6.5rem;
      margin-top: 0;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }

  div:nth-child(2) {
    border: 1px solid ${props => props.theme.Gray};
    color: ${props => props.theme.Gray};
    @media screen and (max-width: 576px) {
      position: absolute;
      margin: 2.5rem 2rem 0 0;
      padding: 0;
      border: 0;
      right: 0;
      width: 13rem;
      height: auto;
      transform: translate(0, 50%);
    }
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
  padding: 1rem 2rem;
  @media screen and (max-width: 576px) {
    display: flex;

    height: 13rem;
    width: 100%;
    border: 0;
    box-shadow: none;
  }
  .mobile-profile-change {
    display: none;

    @media screen and (max-width: 576px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button {
      border-radius: 0.7rem;
      background-color: #fff;
      font-weight: bold;
      font-size: 1.6rem;
      @media screen and (max-width: 576px) {
        width: 12rem;
        height: 3rem;
        color: #5200ff;
        border: 1px solid ${props => props.theme.MainColor};
        border-radius: 20px;
        background-color: white;
        text-align: center;
      }
    }
  }

  div:nth-child(1) {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    @media screen and (max-width: 576px) {
      align-items: center;
      width: 40%;
      height: 100%;
    }
    img {
      @media screen and (max-width: 576px) {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
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

    @media screen and (max-width: 576px) {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      padding-left: 2rem;

      height: 100%;
    }
  }
  .web-profile-change {
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 576px) {
      display: none;
    }
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
  @media screen and (max-width: 576px) {
    display: none;
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

export const StNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;

  button {
    text-align: center;
    padding: 0;
    margin: 0 5px;
    border-radius: 20%;
    width: 2rem;
    height: 2rem;
    line-height: 1.4rem;
    background-color: #fff;
    color: ${props => props.theme.MainColor};
    border: 1px solid ${props => props.theme.MainColor};
    font-size: 1.3rem;
  }

  .on {
    background-color: ${props => props.theme.MainColor};
    color: #fff;
  }
`;

export const StProfileChangeForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: space-between;
  .inputsDiv {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    h2 {
      font-size: 1.8rem;
      font-weight: bold;
    }
    input {
      font-size: 1.5rem;
    }
    label {
      font-size: 1.5rem;
      white-space: nowrap;
    }
    span {
      margin-top: 1rem;
      font-size: 1.3rem;
      color: red;
    }
  }
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 50%;
    background-color: #fff;
    color: ${props => props.theme.MainColor};
    border: 1px solid ${props => props.theme.MainColor};
    padding: 0;
  }
`;
export const ProcessDiv = styled.div<{isPWCorrect: boolean}>`
  display: flex;
  margin: 0 auto;
  span:nth-child(1) {
    width: 2.5rem;
    height: 0.6rem;
    background-color: ${props =>
      props.isPWCorrect === false
        ? props.theme.MainColor
        : props.theme.LightGray};
    margin: 0.5rem 0.3rem;
  }
  span:nth-child(2) {
    width: 2.5rem;
    height: 0.6rem;
    background-color: ${props =>
      props.isPWCorrect === true
        ? props.theme.MainColor
        : props.theme.LightGray};
    margin: 0.5rem 0.3rem;
  }
`;

export const StOutletWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const StInquiryMobileDiv = styled.div`
  display: none;
  @media screen and (max-width: 576px) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0rem 2rem 1rem 2rem;
    button {
      width: 100%;
      height: 6rem;
      border-radius: 0.7rem;
      background-color: ${props => props.theme.MainColor};
      color: #fff;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
`;
