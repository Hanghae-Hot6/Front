import React, {useRef} from 'react';

type useMessageBoxHooksProps = {};

const useMessageBoxHooks = () => {
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  const scrollToMiddle = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = 400;
    }
  };

  return {messageBoxRef, scrollToBottom, scrollToMiddle};
};
export default useMessageBoxHooks;
