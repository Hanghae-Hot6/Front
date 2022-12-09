import styled from 'styled-components';

export const Chat = styled.div`
  @media screen and (min-width: 576px) {
    position: fixed;
    width: 33rem;

    height: 60rem;

    bottom: 10rem;
    right: 10rem;

    background-color: ${props => props.theme.White};
    box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
    border-radius: 0.7rem;
    z-index: 13;
  }
  /* border: 1px solid black; */

  /* @media screen and (max-height: 500px) {
  height: 50rem;
  bottom: 5px;
} */
`;

export const ChatHeader = styled.div`
  display: flex;
  height: 7.2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem;
  /* border: 1px solid black; */
`;

export const ChatTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  @media screen and (max-width: 576px) {
    font-size: 2.8rem;
  }
`;

export const CloseBtn = styled.button`
  background-color: #fff;
`;

export const ChatRoomsListDiv = styled.div`
  @media screen and (max-width: 576px) {
    padding: 2rem 1.8rem;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 51.4rem;
  padding: 1.4rem 1.2rem;
  overflow: scroll;
  @media screen and (max-height: 500px) {
    height: 45rem;
    bottom: 5px;
  }
`;

// header 부분

export const GoBackBtn = styled.button`
  background-color: #fff;
`;

export const ClubName = styled.span`
  font-size: 1.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 채팅방이 없을 때
export const NoneClub = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 18rem auto;
  gap: 1.5rem;
  p {
    color: ${props => props.theme.LightGray};
    font-weight: 600;
    font-size: 1.6rem;
  }
  a {
    width: 10rem;
    height: 3rem;
    border: 1px solid transparent;
    border-radius: 3rem;
    background-color: ${props => props.theme.MainColor};
    color: #fff;
    font-size: 1.6rem;
    text-align: center;
    line-height: 3rem;
    transition: all 0.5s;
    :hover {
      border: 1px solid ${props => props.theme.MainColor};
      background-color: #fff;
      color: ${props => props.theme.MainColor};
    }
  }
`;
