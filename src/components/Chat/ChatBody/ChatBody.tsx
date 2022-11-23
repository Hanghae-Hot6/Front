import axios from 'axios';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import ChatRoomBrief from '../ChatRoomBrief/ChatRoomBrief';
import ChatRoomNotAvaliable from '../ChatRoomNotAvaliable';
import OnChat from '../OnChat/OnChat';

type ChatBodyProps = {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
};

type ChatRoomType = {
  chatRoomId: string;
  thumbnail: string;
  clubName: string;
  participants: number;
};

type ChatRoomTypeDepricated = {
  chatRoomId: string;
  title: string;
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

  let myChatRooms: ChatRoomTypeDepricated[] = [];
  if (chatRoomsFromQuery?.data.data) {
    myChatRooms = chatRoomsFromQuery?.data.data as ChatRoomTypeDepricated[];
  }

  const FakeData = [
    {chatRoomId: 'yes', title: 'yes'},
    {chatRoomId: 'yes1', title: 'yes1'},
  ];

  // 채팅방 입장 코드

  const [enterChatRoom, setEnterChatRoom] = useState<boolean>(false);
  const [chatRoomNowInfo, setChatRoomNowInfo] = useState<string | undefined>(
    undefined,
  );

  const handleRoomClick = (chatRoomId: string, title: string) => {
    setEnterChatRoom(true);
    setChatRoomNowInfo(title);
  };

  return (
    <>
      <Chat>
        <ChatHeader>
          {enterChatRoom ? (
            <>
              <button
                onClick={() => {
                  setEnterChatRoom(false);
                }}>
                뒤로가기
              </button>
              채팅방 안임 <span>{chatRoomNowInfo}</span>
              <CloseBtn
                onClick={() => {
                  setShowChat(false);
                }}>
                닫기
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

        <ThinLine color={Theme.LightGray} />

        <ChatRoomsListDiv>
          {enterChatRoom ? (
            <OnChat />
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
                        title={val.title}
                      />
                    );
                  })}
                </div>
              ) : chatRoomsStatus === 'success' && myChatRooms.length === 0 ? (
                <ChatRoomNotAvaliable />
              ) : (
                <div>서버통신 안되고 있음</div>
              )}

              {/* {FakeData.map(val => {
                return (
                  <ChatRoomBrief
                    handleRoomClick={handleRoomClick}
                    key={val.chatRoomId}
                    chatRoomId={val.chatRoomId}
                    title={val.title}
                  />
                );
              })} */}
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
  background-color: aliceblue;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const ChatTitle = styled.h1`
  font-size: 2.4rem;
`;

const CloseBtn = styled.button``;

const ChatRoomsListDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 1.4rem 1.2rem;
`;
