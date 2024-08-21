'use client';

import request from '@/utils/request';
import Cookies from 'js-cookie';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io } from 'socket.io-client';

const GlobalContext = createContext({
  countMessage: 0,
  setCountMessage: () => 0,
});

export const GlobalContextProvider = ({ children }) => {
  const [countMessage, setCountMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [partnerDatas, setPartnerDatas] = useState([]);

  const fetchusers = useCallback(async () => {
    // Periksa token sebelum melakukan request
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    await request
      .get(`/auth/profile`)
      .then(function (response) {
        setUserId(response.data.data.id);
      })
      .catch(function (error) {});
  }, []);

  useEffect(() => {
    Promise.all([fetchusers()]);
  }, [fetchusers]);

  useEffect(() => {
    const socket = io(`https://api.yukumkm.my.id?userId=${userId}`);

    socket.on('chatList', (response) => {
      const total = response.reduce((acc, curr) => acc + curr.unreadCount, 0);
      setCountMessage(total);
    });
    socket.emit('getChatList', { query: '' });

    return () => {
      socket.off('chatList');
    };
  }, [userId]);

  return (
    <GlobalContext.Provider value={{ countMessage, setCountMessage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
