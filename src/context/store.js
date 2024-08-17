'use client';

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({
  countMessage: 0,
  setCountMessage: () => 0,
});

export const GlobalContextProvider = ({ children }) => {
  const [countMessage, setCountMessage] = useState('');

  return (
    <GlobalContext.Provider value={{ countMessage, setCountMessage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
