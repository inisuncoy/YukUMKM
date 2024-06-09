import Link from 'next/link';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';

import icontoko from '../../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';

const ChatPage = () => {
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
              Obrolan (3)
            </h1>
          </div>
        </div>
        <div className="bg-white rounded-[8px] py-[26px]  h-[62vh]">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 ">
              <li className="py-3 sm:py-4 px-3 sm:px-3 bg-[#FFECD1]">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      width={0}
                      height={0}
                      className="w-8 h-8 rounded-full"
                      src={icontoko}
                      alt="Michael image"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      Gas dibeli kuy! ini sangat limited ba..{' '}
                    </p>
                  </div>
                  <div className="ml-[10px] w-[30px] h-[30px] rounded-full border-2 border-[#FE6D00] flex justify-center items-center text-[#FE6D00]">
                    <p>1</p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4 px-3 sm:px-3">
                <div className="flex items-center ">
                  <div className="flex-shrink-0">
                    <Image
                      width={0}
                      height={0}
                      className="w-8 h-8 rounded-full"
                      src={icontoko}
                      alt="Lana image"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                      Lana Byrd
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      Gas dibeli kuy! ini sangat limited ba..
                    </p>
                  </div>
                  <div className="ml-[10px] w-[30px] h-[30px] rounded-full border-2 border-[#FE6D00] flex justify-center items-center text-[#FE6D00]">
                    <p>3</p>
                  </div>
                </div>
              </li>
              <li className="pt-3 pb-0 sm:pt-4 px-3 sm:px-3">
                <div className="flex items-center ">
                  <div className="flex-shrink-0">
                    <Image
                      width={0}
                      height={0}
                      className="w-8 h-8 rounded-full"
                      src={icontoko}
                      alt="Thomas image"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate da">
                      Thomes Lean
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      Gas dibeli kuy! ini sangat limited ba..
                    </p>
                  </div>
                  <div className="ml-[10px] w-[30px] h-[30px] rounded-full border-2 border-[#FE6D00] flex justify-center items-center text-[#FE6D00]">
                    <p>8</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full bg-white relative">
        <div className="flex justify-between px-[44px] py-[22px] shadow-lg">
          <div className="flex gap-[18px] items-center">
            <Image
              width={0}
              height={0}
              alt="profile"
              src={icontoko}
              className="w-[26px] h-[26px] "
            />
            <h1 className="text-[20px] font-semibold text-gray-900 truncate">
              Michael Gough
            </h1>
          </div>
          <div>
            <IoTrashOutline className="text-red-500 text-[25px]" />
          </div>
        </div>
        <div className="h-[64vh] px-[16px] pt-[12px] overflow-y-auto no-scrollbar">
          <div className="w-full">
            <p className="text-center">20 apr 2024</p>
            <div className="flex w-full flex-col gap-4 mt-2">
              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>

              <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-slate-100 p-4 text-sm text-slate-700 md:max-w-[60%] ">
                I accidentally deleted some important files. Can they be
                recovered?
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 text-slate-700 md:max-w-[60%] ">
                <div className="text-sm">
                  Im sorry to hear that. Let me guide you through the process to
                  resolve it. Could you please provide your username?
                </div>
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>
              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>

              <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-slate-100 p-4 text-sm text-slate-700 md:max-w-[60%] ">
                I accidentally deleted some important files. Can they be
                recovered?
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 text-slate-700 md:max-w-[60%] ">
                <div className="text-sm">
                  Im sorry to hear that. Let me guide you through the process to
                  resolve it. Could you please provide your username?
                </div>
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>
              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>

              <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-slate-100 p-4 text-sm text-slate-700 md:max-w-[60%] ">
                I accidentally deleted some important files. Can they be
                recovered?
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 text-slate-700 md:max-w-[60%] ">
                <div className="text-sm">
                  Im sorry to hear that. Let me guide you through the process to
                  resolve it. Could you please provide your username?
                </div>
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-[16px]">
            <p className="text-center">20 apr 2024</p>
            <div className="flex w-full flex-col gap-4 mt-2">
              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>

              <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-slate-100 p-4 text-sm text-slate-700 md:max-w-[60%] ">
                I accidentally deleted some important files. Can they be
                recovered?
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 text-slate-700 md:max-w-[60%] ">
                <div className="text-sm">
                  Im sorry to hear that. Let me guide you through the process to
                  resolve it. Could you please provide your username?
                </div>
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>
              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>

              <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-slate-100 p-4 text-sm text-slate-700 md:max-w-[60%] ">
                I accidentally deleted some important files. Can they be
                recovered?
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 text-slate-700 md:max-w-[60%] ">
                <div className="text-sm">
                  Im sorry to hear that. Let me guide you through the process to
                  resolve it. Could you please provide your username?
                </div>
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>
              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>

              <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-slate-100 p-4 text-sm text-slate-700 md:max-w-[60%] ">
                I accidentally deleted some important files. Can they be
                recovered?
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 text-slate-700 md:max-w-[60%] ">
                <div className="text-sm">
                  Im sorry to hear that. Let me guide you through the process to
                  resolve it. Could you please provide your username?
                </div>
              </div>

              <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl border border-[#C1BDBD] p-4 md:max-w-[60%] ">
                <div className="text-sm text-slate-700 ">
                  Hi there! How can I assist you today?
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full px-[16px] pb-[22px]">
          <div className="w-full relative">
            <input
              className=" w-full py-[20px] pl-[10px] rounded-[8px] border-2 border-gray-300"
              placeholder="Type a message..."
            />
            <button className="absolute z-50 top-0 right-0 bottom-0 m-auto mr-[15px] ">
              <RiSendPlaneLine className="text-[24px] text-black " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
