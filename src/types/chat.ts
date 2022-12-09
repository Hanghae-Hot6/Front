export type ChatRoomType = {
  chatRoomId: string;
  thumbnail: string;
  clubName: string;
  participants: number;
};

export type ChatType = {
  chatRoomId: string;
  date: string;
  message: string;
  sender: string;
  type: string;
};
