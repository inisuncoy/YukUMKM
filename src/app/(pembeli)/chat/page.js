/* eslint-disable @next/next/no-img-element */
'use client';
// import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';

import { io } from 'socket.io-client';
// const socket = io(
//   'https://api.yukumkm.my.id?userId=c6875c63-6738-4bf7-a4d6-0ac95482c5ab'
// );

import icontoko from '../../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import request from '@/utils/request';

const ChatPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [partnerDatas, setPartnerDatas] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [partnerId, setPartnerId] = useState(null);
  const [detailPartner, setDetailPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const profile = searchParams.get('profile') ?? '';
  const name = searchParams.get('name') ?? '';

  const socketRef = useRef();

  const fetchusers = useCallback(async () => {
    await request
      .get(`/auth/profile`)
      .then(function (response) {
        setUserId(response.data.data.id);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchusers();
  }, [fetchusers]);

  console.log(userId);

  useEffect(() => {
    // This will run only in the client
    setIsClient(true);
    const token = Cookies.get('token');
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    const socket = io(`https://api.yukumkm.my.id?userId=${userId}`);
    socketRef.current = socket;
    if (!hasToken) return;

    socket.on('chat partners', (response) => {
      setPartnerDatas(response);
    });

    socket.emit('chat partners');

    socket.on('previous messages', (response) => {
      setListMessage(response);
    });

    if (id && name && profile) {
      handlePartner(id);
    }

    return () => {
      socket.off('chat partners');
      socket.off('previous messages');
    };
  }, [hasToken, userId, id, name, profile]);

  const handlePartner = (partnerId) => {
    const socket = socketRef.current;
    socket.emit('join room', { partnerId });
    socket.emit('exit room', { partnerId });
    setPartnerId(partnerId);
  };

  const handleSendMassage = (e) => {
    e.preventDefault();
    const socket = socketRef.current;
    socket.emit(
      'private message',
      {
        partnerId: partnerId,
        message: message,
      },
      () => {
        socket.emit('chat partners');
      }
    );
    setMessage('');
  };

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  if (!isClient) {
    return null;
  }

  if (!hasToken) {
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

  console.log('partner : ', partnerDatas);
  console.log('message : ', listMessage);
  console.log('message : ', profile);
  console.log('message : ', partnerId);

  return (
    <div className="grid grid-cols-3 gap-[29px]  ">
      <div className=" h-full w-full flex flex-col gap-[29px]">
        <div className="w-full relative">
          <input
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
                    className="py-3 sm:py-4 px-3 sm:px-3 cursor-pointer "
                    onClick={() => {
                      handlePartner(
                        data.sender.id != userId
                          ? data.sender.id
                          : data.receiver.id
                      ),
                        setPartnerId(
                          data.sender.id != userId
                            ? data.sender.id
                            : data.receiver.id
                        ),
                        setDetailPartner(data);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          loading="lazy"
                          width={0}
                          height={0}
                          alt="product-bg"
                          sizes="100vw"
                          src={
                            data.sender.id != userId
                              ? data.sender.profile_uri
                                ? process.env.NEXT_PUBLIC_HOST +
                                  data.sender.profile_uri
                                : '/assets/icon/store.jpeg'
                              : data.receiver.profile_uri
                              ? process.env.NEXT_PUBLIC_HOST +
                                data.receiver.profile_uri
                              : '/assets/icon/store.jpeg'
                          }
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                          {data.sender.id != userId
                            ? data.sender.name
                            : data.receiver.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                          {data.message}
                        </p>
                      </div>
                      <div className="ml-[10px] w-[30px] h-[30px] rounded-full border-2 border-[#FE6D00] flex justify-center items-center text-[#FE6D00]">
                        <p>1</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full bg-white relative">
        {detailPartner || (id && name && profile) ? (
          <div>
            <div className="flex justify-between px-[44px] py-[22px] shadow-lg">
              <div className="flex gap-[18px] items-center">
                <Image
                  width={0}
                  height={0}
                  alt="profile"
                  sizes="100vw"
                  loading="lazy"
                  src={
                    detailPartner
                      ? detailPartner.sender.id != userId
                        ? detailPartner.sender.profile_uri
                          ? process.env.NEXT_PUBLIC_HOST +
                            detailPartner.sender.profile_uri
                          : '/assets/icon/store.jpeg'
                        : detailPartner.receiver.profile_uri
                        ? process.env.NEXT_PUBLIC_HOST +
                          detailPartner.receiver.profile_uri
                        : '/assets/icon/store.jpeg'
                      : profile != null
                      ? '/assets/icon/store.jpeg'
                      : '/assets/icon/store.jpeg'
                  }
                  className="w-[26px] h-[26px] object-cover"
                />
                <h1 className="text-[20px] font-semibold text-gray-900 truncate">
                  {detailPartner
                    ? detailPartner.sender.id != userId
                      ? detailPartner.sender.name
                      : detailPartner.receiver.name
                    : name}
                </h1>
              </div>
              <div>
                <IoTrashOutline className="text-red-500 text-[25px]" />
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
                  className=" w-full py-[20px] pl-[10px] rounded-[8px] border-2 border-gray-300"
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
          <div className="w-full h-full flex justify-center items-center">
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
      </div>
    </div>
  );
};

export default ChatPage;
