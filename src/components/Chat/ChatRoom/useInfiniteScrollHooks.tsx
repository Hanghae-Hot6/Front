import {AxiosResponse} from 'axios';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useQuery} from 'react-query';
import {chatApis} from '../../../api/axiosConfig';
import {ChatType} from '../../../types/chat';
import {applyDebouncing} from '../../../utils/debouncingFunction';

// type useInfiniteScrollHooksProps = {chatRoomId: string};

const useInfiniteScrollHooks = (chatRoomId: string) => {
  const [prevMessageList, setPrevMessageList] = useState<ChatType[]>([]);
  const [page, setPage] = useState<number>(0);
  const fetchSize = useRef<number>(8);
  const [noMoreFetching, setNoMoreFetching] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {data: chatRoomMessages, refetch: fetchChatRoomMessages} = useQuery(
    [
      'getChatRoomMessages',
      {
        chatRoomId: chatRoomId,
        page,
        size: fetchSize.current,
      },
    ],
    async ({queryKey}) => {
      if (page < 1 || noMoreFetching) return;

      const response = (await applyDebouncing(300, () => {
        return chatApis.getChatRoomMessages(queryKey[1]);
      })) as AxiosResponse<any, any>;
      // const response = await chatApis.getChatRoomMessages(queryKey[1])
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      // enabled: false,
      refetchInterval: 10 * 1000,
      retry: 0,
      onSuccess: data => {
        if (!data) return;
        const messagesFromServer = [...data.data];
        const totalMessageLength: number =
          messagesFromServer.pop().chatMessageCount;
        const allChatMessages: ChatType[] = messagesFromServer[0];

        if (allChatMessages.length < fetchSize.current) {
          setNoMoreFetching(false);
        }

        setPrevMessageList([...allChatMessages.reverse(), ...prevMessageList]);
        setIsLoading(!isLoading);
      },
      onError: err => {
        console.log('err');
        console.log(err);
      },
    },
  );

  const chatRoomTopObserver = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchChatRoomMessages();
  }, []);

  const Observer = useMemo(() => {
    return new IntersectionObserver(
      // 왜 noMoreFetching 이 안먹을까요????

      entries => {
        if (noMoreFetching) {
          return;
        }
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          setPage(prev => prev + 1);
        }
      },
      {threshold: 0.25, rootMargin: '80px'},
    );
  }, [noMoreFetching]);

  useEffect(() => {
    if (chatRoomTopObserver) {
      Observer.observe(chatRoomTopObserver.current!);
    }
    return () => {
      if (chatRoomTopObserver.current) {
        Observer.unobserve(chatRoomTopObserver.current!);
      }
    };
  }, [chatRoomTopObserver]);

  return {
    chatRoomTopObserver,
    fetchChatRoomMessages,
    prevMessageList,
    isLoading,
  };
};
export default useInfiniteScrollHooks;
