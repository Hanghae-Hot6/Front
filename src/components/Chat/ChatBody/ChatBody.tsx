import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import {getAccessToken, getUserIdFixed} from '../../../utils';
import ChatRoomBrief from '../ChatRoomBrief/ChatRoomBrief';
import ChatRoom from '../ChatRoom/ChatRoom';
import left_arrow from '../../../assets/CaretLeft.svg';
import close_btn from '../../../assets/Xbtn.svg';
import logo_gray from '../../../assets/logo_gray.svg';
import {Link, useNavigate} from 'react-router-dom';
import useWindowSizeDetector from '../../../Hooks/useWindowSizeDetector';
import {useAppDispatch, useAppSelector} from '../../../Redux/store/store';
import {
  setChatButtonShowToFalse,
  setChatButtonShowToTrue,
  setChatShowToFalse,
  setScrollButtonShowToTrue,
} from '../../../Redux/modules/slices/chatAndChatButtonShowSlice';
import {ChatRoomType} from '../../../types/chat';
import * as C from './ChatBody.style';

type ChatBodyProps = {
  // setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatBody = ({}: ChatBodyProps) => {
  const {windowWidth, widthIsIncreasing} = useWindowSizeDetector();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const userId = getUserIdFixed();
  const dispatch = useAppDispatch();
  const {chatShow} = useAppSelector(
    state => state.chatAndChatButtonShowReducer,
  );

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

    {
      retry: 0,
      onError: (error: any) => {
        // 로그인 에러 남바 : 403 or 401
        if (error.response.status === 500) {
          return alert('로그인이 필요합니다.'), navigate('/Login');
        }
      },
    },
  );

  let myChatRooms: ChatRoomType[] = [];
  if (chatRoomsFromQuery?.data.data) {
    myChatRooms = chatRoomsFromQuery?.data.data as ChatRoomType[];
  }

  // 채팅방 입장 코드

  const [enterChatRoom, setEnterChatRoom] = useState<boolean>(false);
  const [chatRoomNowInfo, setChatRoomNowInfo] = useState<
    ChatRoomType | undefined
  >(undefined);

  const handleRoomClick = (chatRoomId: string, chatRoomInfo: ChatRoomType) => {
    setEnterChatRoom(true);
    setChatRoomNowInfo(chatRoomInfo);
  };

  const handleCloseBtnClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (windowWidth < 576) {
      navigate(-1);
    } else {
      dispatch(setChatShowToFalse());
    }
  };
  useEffect(() => {
    dispatch(setChatButtonShowToFalse());

    return () => {
      dispatch(setChatButtonShowToTrue());
    };
  }, []);

  useEffect(() => {
    if (chatShow && !widthIsIncreasing && windowWidth < 564) {
      navigate('/mobile_chat');
      dispatch(setChatShowToFalse());
    }
  }, [windowWidth]);

  return (
    <>
      <C.Chat>
        <C.ChatHeader>
          {enterChatRoom ? (
            <>
              <C.GoBackBtn
                onClick={() => {
                  setEnterChatRoom(false);
                }}>
                <img src={left_arrow} alt="뒤로가기" />
              </C.GoBackBtn>

              <C.ClubName>{chatRoomNowInfo?.clubName}</C.ClubName>
              <C.CloseBtn onClick={handleCloseBtnClick}>
                <img src={close_btn} alt="닫기 버튼" />
              </C.CloseBtn>
            </>
          ) : (
            <>
              <C.ChatTitle>메세지</C.ChatTitle>
              <C.CloseBtn onClick={handleCloseBtnClick}>
                <img src={close_btn} alt="닫기 버튼" />
              </C.CloseBtn>
            </>
          )}
        </C.ChatHeader>

        {chatShow && <ThinLine color={Theme.LightGray} thick="1px" />}

        <C.ChatRoomsListDiv>
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
                <C.NoneClub>
                  <img src={logo_gray} alt="회색로고" />
                  <p>가입된 모임이 없습니다.</p>
                  <Link to="/club_list">모임 찾기</Link>
                </C.NoneClub>
              ) : null}
              {chatRoomsStatus === 'loading' ? (
                <C.NoneClub>
                  <div>Loading</div>
                </C.NoneClub>
              ) : accessToken ? null : (
                <C.NoneClub>
                  <div>회원가입을 해주세요.</div>
                </C.NoneClub>
              )}
            </>
          )}
        </C.ChatRoomsListDiv>
      </C.Chat>
    </>
  );
};
export default ChatBody;
