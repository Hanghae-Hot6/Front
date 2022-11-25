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
import left_arrow from '../../../assets/left_arrow.svg';

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
                <img src="/assets/x.svg" alt="닫기" />
              </CloseBtn>
            </>
          ) : (
            <>
              <ChatTitle>메세지</ChatTitle>
              <CloseBtn
                onClick={() => {
                  setShowChat(false);
                }}>
                닫기
              </CloseBtn>
            </>
          )}
        </ChatHeader>

        <ThinLine color={Theme.LightGray} thick="2px" />

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
                <div>서버통신 안되고 있음</div>
              )}
            </>
          )}
        </ChatRoomsListDiv>
      </Chat>
    </>
  );
};
export default ChatBody;

const Chat = styled.div`
  position: fixed;
  width: 33rem;
  height: 60rem;
  bottom: 20rem;
  right: 12rem;
  background-color: ${props => props.theme.White};
  border: 1px solid ${props => props.theme.LightPurple2};
  border-radius: 1rem;
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
  font-size: 1200;
`;

const CloseBtn = styled.button``;

const ChatRoomsListDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 51.4rem;
  padding: 1.4rem 1.2rem;
`;

// header 부분

const GoBackBtn = styled.button``;

const ClubName = styled.span`
  font-size: 1.8rem;
`;
