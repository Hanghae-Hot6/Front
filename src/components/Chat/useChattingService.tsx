import React from 'react';
import ChattingService from './ChattingService';

type useChattingServiceProps = {
  chatRoomId: string;
};

const useChattingService = ({chatRoomId}: useChattingServiceProps) => {
  return new ChattingService(chatRoomId);
};
export default useChattingService;
