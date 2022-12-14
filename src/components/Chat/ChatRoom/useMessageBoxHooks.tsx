import React, {useRef} from 'react';

type useMessageBoxHooksProps = {};

const useMessageBoxHooks = () => {
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  return {messageBoxRef, scrollToBottom};
};
export default useMessageBoxHooks;
