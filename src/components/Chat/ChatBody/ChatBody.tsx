import axios from 'axios';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import ChatRoomBrief from '../ChatRoomBrief/ChatRoomBrief';
import ChatRoomNotAvaliable from '../ChatRoomNotAvaliable';
import ChatRoom from '../ChatRoom/ChatRoom';
import left_arrow from '../../../assets/CaretLeft.svg';
import close_btn from '../../../assets/Xbtn.svg';
import logo_gray from '../../../assets/logo_gray.svg';
import {Link} from 'react-router-dom';
type ChatBodyProps = {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ChatRoomType = {
  chatRoomId: string;
  thumbnail: string;
  clubName: string;
  participants: number;
};

const ChatBody = ({setShowChat}: ChatBodyProps) => {
  const accessToken = getAccessToken();

  const userId = getUserIdFixed();

  // 나의 채팅룸 목록 가져오기
  const fetchChatRooms = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/chat/rooms`,
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  };

  const {data: chatRoomsFromQuery, status: chatRoomsStatus} = useQuery(
    'getChatRooms',
    fetchChatRooms,
  );

  let myChatRooms: ChatRoomType[] = [];
  if (chatRoomsFromQuery?.data.data) {
    myChatRooms = chatRoomsFromQuery?.data.data as ChatRoomType[];
  }

  // console.log(myChatRooms);

  // 채팅방 입장 코드

  const [enterChatRoom, setEnterChatRoom] = useState<boolean>(false);
  const [chatRoomNowInfo, setChatRoomNowInfo] = useState<
    ChatRoomType | undefined
  >(undefined);

  const handleRoomClick = (chatRoomId: string, chatRoomInfo: ChatRoomType) => {
    setEnterChatRoom(true);
    setChatRoomNowInfo(chatRoomInfo);
  };

  return (
    <>
      <Chat>
        <ChatHeader>
          {enterChatRoom ? (
            <>
              <GoBackBtn
                onClick={() => {
                  setEnterChatRoom(false);
                }}>
                <img src={left_arrow} alt="뒤로가기" />
              </GoBackBtn>

              <ClubName>{chatRoomNowInfo?.clubName}</ClubName>
              <CloseBtn
                onClick={() => {
                  setShowChat(false);
                }}>
                <img src={close_btn} alt="닫기 버튼" />
              </CloseBtn>
            </>
          ) : (
            <>
              <ChatTitle>메세지</ChatTitle>
              <CloseBtn
                onClick={() => {
                  setShowChat(false);
                }}>
                <img src={close_btn} alt="닫기 버튼" />
              </CloseBtn>
            </>
          )}
        </ChatHeader>

        <ThinLine color={Theme.LightGray} thick="1px" />

        <ChatRoomsListDiv>
          {enterChatRoom ? (
            <>
              {chatRoomNowInfo ? (
                <>
                  <ChatRoom chatRoomNowInfo={chatRoomNowInfo} />
                </>
              ) : undefined}
            </>
          ) : (
            <>
              {chatRoomsStatus === 'success' && myChatRooms.length > 0 ? (
                <div>
                  {myChatRooms.map(val => {
                    return (
                      <ChatRoomBrief
                        handleRoomClick={handleRoomClick}
                        key={val.chatRoomId}
                        chatRoomId={val.chatRoomId}
                        chatRoomInfo={val}
                      />
                    );
                  })}
                </div>
              ) : chatRoomsStatus === 'success' && myChatRooms.length === 0 ? (
                <ChatRoomNotAvaliable />
              ) : (
                <NoneClub>
                  <img src={logo_gray} alt="회색로고" />
                  <p>가입된 모임이 없습니다.</p>
                  <Link to="/club_list">모임 찾기</Link>
                </NoneClub>
              )}
            </>
          )}
        </ChatRoomsListDiv>
      </Chat>
    </>
  );
};
export default ChatBody;
const NoneClub = styled.div`
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

const Chat = styled.div`
  position: fixed;
  width: 33rem;
  height: 60rem;
  bottom: 10rem;
  right: 10rem;
  background-color: ${props => props.theme.White};
  /* border: 1px solid ${props => props.theme.LightPurple2}; */
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
  border-radius: 0.7rem;
  z-index: 13;
`;

const ChatHeader = styled.div`
  display: flex;
  height: 7.2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem;
`;

const ChatTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background-color: #fff;
`;

const ChatRoomsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 51.4rem;
  padding: 1.4rem 1.2rem;
`;

// header 부분

const GoBackBtn = styled.button`
  background-color: #fff;
`;

const ClubName = styled.span`
  font-size: 1.8rem;
`;
