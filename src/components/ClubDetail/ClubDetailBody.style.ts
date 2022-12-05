import styled from 'styled-components';

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MainContent = styled.div`
  display: flex;
  margin-top: 5rem;
  padding-bottom: 9.5rem;
  border-bottom: 1px solid #eee;
`;

export const ImageWrap = styled.div`
  width: 57.3rem;
  height: 56rem;
  background-color: #cacad7;
  display: flex;
  margin-right: 9.2rem;
  overflow: hidden;

  > img {
    display: inline-block;
    margin: 5% auto;
    width: 35rem;
    height: 90%;
    object-fit: cover;
    object-position: top;
  }
`;

export const TitleWrap = styled.div`
  width: 59.2rem;
  border-bottom: 1px solid #dbdbdb;

  > h3 {
    color: gray;
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
  }
  > h2 {
    font-weight: 600;
    font-size: 3rem;
    margin-bottom: 1.8rem;
  }
  > p {
    color: ${props => props.theme.MainColor};
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 30px;
  }
`;

export const ClubInfoWrap = styled.div`
  > p {
    font-size: 1.8rem;
    margin-bottom: 4rem;
    color: ${props => props.theme.Gray};
  }
  > p > span {
    display: inline-block;
    width: 10rem;
    font-weight: 600;
  }
`;

export const ClubJoin = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
`;

export const InterestBtn = styled.button`
  padding: 0;
  width: 6rem;
  height: 6rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Btn = styled.button`
  width: 25.6rem;
  background: #fff;
  border: 1px solid ${props => props.theme.MainColor};
  height: 6rem;
  color: ${props => props.theme.MainColor};
  transition: all 0.5s;
  font-weight: 600;
  box-sizing: border-box;
  :hover {
    color: #fff;
    background-color: ${props => props.theme.MainColor};
    border: 1px solid transparent;
  }
`;

export const JoinBtn = styled.button`
  font-size: 1.8rem;
  font-weight: 600;
  width: 30rem;
  background: #222;
  height: 6rem;
  color: #fff;
`;

export const Main = styled.div`
  margin-top: 6.7rem;

  > section {
    padding-bottom: 5rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 5rem;
    h2 {
      font-weight: 600;
      font-size: 2.4rem;
      margin-bottom: 5rem;
      > span {
        color: ${props => props.theme.MainColor};
      }
    }
    p {
      font-size: 1.8rem;
      > span {
        font-weight: 600;
        width: 10rem;
        display: inline-block;
        margin-bottom: 3rem;
      }
    }
    > div {
      width: 100%;
      height: 42.6rem;
      background-color: ${props => props.theme.LightGray};
      margin-bottom: 5.6rem;
      > div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5rem;
      }
      > div > a > img {
        width: 25.3rem;
        height: 37rem;
        filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.18));
        object-fit: cover;
      }
    }
    textarea {
      padding: 0;
      width: 100%;
      min-height: 35rem;
      max-height: 45rem;
      border: none;
      resize: none;
      line-height: 3;
      font-weight: 600;
      font-size: 2rem;
      font-family: 'Pretendard-Regular', sans-serif;
      :focus {
        outline: none;
      }
    }
  }
`;
