import sockJS from 'sockjs-client';

import {Stomp} from '@stomp/stompjs';
import {isReadable} from 'stream';

type MessageObjectType = {
  message: string;
  // Accesstoken: string | undefined;
  type: string;
  chatRoomId: number | string;
  sender: string | undefined;
};

type functionType = ({...props}) => void;
type HeadersType =
  | {
      Authorization: string | undefined;
    }
  | {};

class ChattingService {
  // 초기 값
  readonly chatRoomId: string = '';

  // constructor 에는 본 class의 instance를 생성할때 등록할 params 를 정의해 준다
  // new ChattingServiece(params)
  constructor(chatRoomId: string) {
    this.chatRoomId = chatRoomId;
  }

  private socket = new sockJS(`${process.env.REACT_APP_BASE_URL}/wss/chat`);
  // socket = new sockJS(`http://220.76.226.226:8080/wss/chatㅅ`);

  private stompClient = Stomp.over(this.socket);

  // chatRoomId = '';

  // 방 id 받기

  // 웹소켓 연결 요청 & 구독 요청

  onConnect = (
    token: string | undefined,
    headers: HeadersType = {}, // headers에 {} 인증요청 집어 넣기
    callback: any = () => {},
    userId: string | undefined,
    componentAddress: string | undefined = undefined,
  ) => {
    let receivingMessage = '';

    // this.stompClient.connect(headers, () => {
    this.stompClient.connect({}, () => {
      console.log('연결됬음 ' + this.chatRoomId);

      this.stompClient.subscribe(
        `/sub/chat/messages/${this.chatRoomId}`,

        data => {
          receivingMessage = JSON.parse(data.body);
          // 연결 성공시 발동시킬 콜백 넣기
          // 주로 메세지를 받는 로직을 여기에 넣는다

          callback(receivingMessage);
        },
        // {},
        token
          ? {
              Authorization: token,
            }
          : {},
      );

      if (componentAddress === 'ChatRoom') {
        this.stompClient.send(
          '/pub/chat/message',
          headers,
          JSON.stringify({
            chatRoomId: this.chatRoomId,
            message: `${userId}님이 접속하셨습니다`,
            type: 'TALK',
            sender: userId,
          }),
        );
      }
    });
    return receivingMessage;
  };

  // 메세지 전송

  sendMessage = (headers = {}, messageObject: MessageObjectType) => {
    this.stompClient.send(
      '/pub/chat/message',
      headers,
      JSON.stringify(messageObject),
    );
  };

  onDisconnect = (userId: string | undefined) => {
    // this.stompClient.send(
    //   '/pub/chat/message',
    //   {},
    //   JSON.stringify({
    //     chatRoomId: this.chatRoomId,
    //     message: `${userId}님이 접속하셨습니다`,
    //     type: 'TALK',
    //     sender: userId,
    //   }),
    // );

    this.stompClient.disconnect();
    console.log('disconnected');
  };
}

export default ChattingService;
