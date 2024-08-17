/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { IoIosSearch } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';

import { useDebounce } from 'use-debounce';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import request from '@/utils/request';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import { useGlobalContext } from '@/context/store';

const ChatPage = () => {
  const [isAction, setIsAction] = useState(false);
  const [partnerDatas, setPartnerDatas] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [partnerId, setPartnerId] = useState(null);
  const [detailPartner, setDetailPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [queryChatList, setQueryChatList] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalChatList, setModalChatList] = useState(true);
  const [loading, setLoading] = useState(true);

  const [queryChatListValue] = useDebounce(queryChatList, 500);

  const { countMessage, setCountMessage } = useGlobalContext();

  const socketRef = useRef();

  const fetchusers = useCallback(async () => {
    // Periksa token sebelum melakukan request
    const token = Cookies.get('token');
    if (!token) {
      setShowModal(true); // Tampilkan modal peringatan jika tidak ada token
      return;
    }
    await request
      .get(`/auth/profile`)
      .then(function (response) {
        setUserId(response.data.data.id);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  const handlePartner = (partnerId) => {
    const socket = socketRef.current;
    socket.emit('getChatHistory', { partnerId });
    setPartnerId(partnerId);
  };

  const handleSendMassage = (e) => {
    e.preventDefault();
    const socket = socketRef.current;
    socket.emit('sendMessages', {
      partnerId: partnerId,
      message: message,
    });
    setMessage('');
    setIsAction(true);
  };
  const handleDeleteChatRoom = async (e, partnerId) => {
    toast.loading('Deleting data...');
    e.preventDefault();
    const socket = socketRef.current;
    socket.emit('deleteChatRoom', { partnerId: partnerId });
    toast.dismiss();
    toast.success('Success Delete Chat Room');
    setDetailPartner('');
    setModalChatList(!modalChatList);
    setIsAction(true);
  };

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const partner = JSON.parse(localStorage.getItem('partner'));
      setDetailPartner(partner);
    }

    Promise.all([fetchusers()]);
  }, [fetchusers]);

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  useEffect(() => {
    const socket = io(`https://api.yukumkm.my.id?userId=${userId}`);
    socketRef.current = socket;

    socket.on('chatList', (response) => {
      setLoading(false);
      setPartnerDatas(response);
    });

    socket.emit('getChatList', { query: queryChatListValue });

    socket.on('chatHistory', (response) => {
      setListMessage(response);
    });

    socket.on('receiverMessage', (response) => {
      setListMessage((prevArray) => [...prevArray, response]);
      setIsAction(true);
    });

    socket.on('senderMessage', (response) => {
      setListMessage((prevArray) => [...prevArray, response]);
    });

    if (detailPartner) {
      handlePartner(detailPartner.id);
    }

    if (isAction) {
      socket.emit('getChatList', { query: queryChatListValue });
      setIsAction(false);
    }

    if (queryChatListValue) {
      socket.emit('getChatList', { query: queryChatListValue });
    }

    return () => {
      socket.off('chatList');
      socket.off('chatHistory');
    };
  }, [userId, detailPartner, isAction, queryChatListValue]);

  const total = partnerDatas.reduce((acc, curr) => acc + curr.unreadCount, 0);
  setCountMessage(total);

  if (showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">You need to log in</h2>
          <p className="mb-4">Please log in to access the chat.</p>
          <Link href="/login">
            <p className="text-blue-500 underline">Go to Login Page</p>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-3 gap-[29px]  ">
      <div className=" h-full w-full hidden md:flex flex-col gap-[29px] ">
        <div className="w-full relative">
          <input
            value={queryChatList}
            onChange={(e) => setQueryChatList(e.target.value)}
            className=" w-full py-[20px] pl-[53px] rounded-[8px]"
            placeholder="Search here..."
          />
          <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
            <IoIosSearch className="text-[24px] text-black " />
          </button>
        </div>
        <div className=" w-full bg-white rounded-lg relative">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Obrolan ({partnerDatas.length})
            </h1>
          </div>
        </div>
        <div className="bg-white rounded-[8px] py-[26px]  h-[62vh]">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 ">
              {partnerDatas &&
                partnerDatas.map((data, i) => (
                  <li
                    key={i}
                    className={`py-3 sm:py-4 px-3 sm:px-3 cursor-pointer ${
                      partnerId == data.id ? 'bg-[#f8cc89]' : ''
                    }`}
                    onClick={() => {
                      handlePartner(data.id),
                        setPartnerId(data.id),
                        setDetailPartner(data);
                      localStorage.removeItem('partner');
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          loading="lazy"
                          width={0}
                          height={0}
                          alt="product-bg"
                          sizes="100vw"
                          src={
                            data.profile_uri
                              ? process.env.NEXT_PUBLIC_HOST + data.profile_uri
                              : '/assets/icon/store.jpeg'
                          }
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {data.name}
                            </h3>
                            <p className="text-sm text-gray-700 truncate">
                              {' '}
                              {data.lastMessage}
                            </p>
                          </div>
                          {data.unreadCount > 0 && (
                            <span
                              className={`bg-[#FE6D00] font-bold text-white text-center py-1 px-2 text-xs rounded`}
                            >
                              {data.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-2 w-full h-[83vh] md:h-full bg-white relative rounded-lg">
        {detailPartner ? (
          <div>
            <div className="flex justify-between px-[20px] md:px-[44px] py-[22px] shadow-lg">
              <div className="flex gap-5 items-center">
                <button
                  type="button"
                  onClick={() => setModalChatList(!modalChatList)}
                  className="inline-flex items-center   justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
                <div className="flex gap-[18px] items-center">
                  <Image
                    width={0}
                    height={0}
                    alt="profile"
                    sizes="100vw"
                    loading="lazy"
                    src={
                      detailPartner && detailPartner.profile_uri
                        ? process.env.NEXT_PUBLIC_HOST +
                          detailPartner.profile_uri
                        : '/assets/icon/store.jpeg'
                    }
                    className="w-[26px] h-[26px] object-cover"
                  />
                  <h1 className="text-[20px] font-semibold text-gray-900 truncate">
                    {detailPartner.name}
                  </h1>
                </div>
              </div>
              <div>
                <IoTrashOutline
                  className="text-red-500 text-[25px]"
                  onClick={(e) => handleDeleteChatRoom(e, detailPartner.id)}
                />
              </div>
            </div>
            <div className="h-[64vh] px-[16px] pt-[12px] overflow-y-auto no-scrollbar">
              <div className="w-full">
                <div className="flex w-full flex-col gap-4 mt-2">
                  {listMessage &&
                    listMessage.map((data, i) => (
                      <div
                        key={i}
                        className={`${
                          userId == data.senderId
                            ? 'ml-auto bg-slate-100 rounded-l-xl rounded-tr-xl text-slate-700'
                            : 'mr-auto rounded-r-xl rounded-tl-xl border border-[#C1BDBD]'
                        }  flex max-w-[80%] flex-col gap-2 p-4 md:max-w-[60%] `}
                      >
                        <div className="text-sm text-slate-700 ">
                          {data.message}
                        </div>
                      </div>
                    ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 w-full px-[16px] pb-[22px]">
              <form className="w-full relative" onSubmit={handleSendMassage}>
                <input
                  className=" w-full py-[20px] pl-[10px] pr-[60px] rounded-[8px] border-2 border-gray-300"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="absolute z-50 top-0 right-0 bottom-0 m-auto mr-[15px] "
                  type="submit"
                >
                  <RiSendPlaneLine className="text-[24px] text-black " />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full h-[83vh] md:h-full  justify-center items-center rounded-lg hidden md:flex">
            <Image
              width={0}
              height={0}
              alt="profile"
              sizes="100vw"
              loading="lazy"
              src={'/assets/img/logo/logo1.png'}
              className="w-[200px] h-[200px] object-cover  "
            />
          </div>
        )}
        {modalChatList && (
          <div className=" h-[83vh] md:h-full w-full  bg-[#F1F1EE] absolute top-0 left-0 z-[50] p-5 block md:hidden ">
            <div className=" h-full w-full flex flex-col gap-[29px] ">
              <div className="w-full relative shadow">
                <input
                  className=" w-full py-[20px] pl-[53px] rounded-[8px]"
                  placeholder="Search here..."
                />
                <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
                  <IoIosSearch className="text-[24px] text-black " />
                </button>
              </div>
              <div className=" w-full bg-white rounded-lg relative shadow">
                <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
                  <span className="border-2 rounded-full border-[#FE6D00]"></span>
                  <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                    Obrolan ({partnerDatas.length})
                  </h1>
                </div>
              </div>
              <div className="bg-white rounded-[8px] py-[26px] h-screen md:h-[62vh] shadow">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 ">
                    {partnerDatas &&
                      partnerDatas.map((data, i) => (
                        <li
                          key={i}
                          className={`py-3 sm:py-4 px-3 sm:px-3 cursor-pointer ${
                            partnerId == data.id ? 'bg-[#f8cc89]' : ''
                          }`}
                          onClick={() => {
                            handlePartner(data.id),
                              setPartnerId(data.id),
                              setDetailPartner(data);
                            setModalChatList(!modalChatList);
                            localStorage.removeItem('partner');
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <Image
                                loading="lazy"
                                width={0}
                                height={0}
                                alt="product-bg"
                                sizes="100vw"
                                src={
                                  data.profile_uri
                                    ? process.env.NEXT_PUBLIC_HOST +
                                      data.profile_uri
                                    : '/assets/icon/store.jpeg'
                                }
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900 truncate">
                                    {data.name}
                                  </h3>
                                  <p className="text-sm text-gray-700 truncate">
                                    {' '}
                                    {data.lastMessage}
                                  </p>
                                </div>
                                {data.unreadCount > 0 && (
                                  <span
                                    className={`bg-[#FE6D00] font-bold text-white text-center py-1 px-2 text-xs rounded`}
                                  >
                                    {data.unreadCount}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
