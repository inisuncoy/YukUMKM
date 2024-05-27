'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import bg1 from '../../../public/assets/img/bg/bg1.png';
import logo1 from '../../../public/assets/img/logo/logo1.png';
import Link from 'next/link';

function Register() {
  const [menu, setMenu] = useState(true);
  return (
    <div className="px-[32px] flex">
      <div className="relative ">
        <div className=" h-screen w-[605px] overflow-hidden">
          <div class="grid grid-cols-2 gap-[29px] grid-flow-row-dense">
            <div class="bg-gray-500 rounded-b-[20px] row-span-5">
              <Image
                width={0}
                height={0}
                alt="background"
                src={bg1}
                className="w-full h-full object-cover rounded-b-[20px]"
              />
            </div>
            <div class="bg-gray-500 rounded-b-[20px] row-span-12">
              <Image
                width={0}
                height={0}
                alt="background"
                src={bg1}
                className="w-full h-full object-cover rounded-b-[20px]"
              />
            </div>
            <div class="bg-gray-500 rounded-[20px] row-span-12">
              <Image
                width={0}
                height={0}
                alt="background"
                src={bg1}
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
            <div class="bg-gray-500 rounded-[20px] row-span-12">
              <Image
                width={0}
                height={0}
                alt="background"
                src={bg1}
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
            <div class="bg-gray-500 rounded-[20px] row-span-12">
              <Image
                width={0}
                height={0}
                alt="background"
                src={bg1}
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
            <div class="bg-gray-500 rounded-[20px] row-span-12">
              <Image
                width={0}
                height={0}
                alt="background"
                src={bg1}
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>
        <div className="absolute m-auto left-0 right-0 top-0 bottom-0 w-[268px] h-[268px] ">
          <Image
            width={0}
            height={0}
            alt="background"
            src={logo1}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
      </div>
      <div className="w-full h-screen  flex justify-start items-center px-[63px]">
        <div className={`w-[550px] h-[613px] flex flex-col gap-[19px]`}>
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="">Register</h1>
          </div>
          <div className="px-[30px] pt-[33px] h-full  bg-white rounded-[8px]">
            <div className="flex ">
              <div
                className={`flex-1 text-center pb-[10px] border-b-4 border-[#FE6D00] cursor-pointer ${
                  menu ? '' : 'opacity-[0.25]'
                }`}
                onClick={() => setMenu(true)}
              >
                <h1 className="text-[#FE6D00]">Pembeli</h1>
              </div>
              <div
                className={`flex-1 text-center pb-[10px] border-b-4 border-[#FE6D00] cursor-pointer ${
                  menu ? 'opacity-[0.25]' : ''
                }`}
                onClick={() => setMenu(false)}
              >
                <h1 className="text-[#FE6D00]">UMKM</h1>
              </div>
            </div>
            {menu ? (
              <div className="pt-[45px]">
                <form>
                  <div className="grid grid-cols-1 gap-[32px]">
                    <div className="relative  w-full min-w-[200px] ">
                      <input
                        id="email"
                        placeholder="Email"
                        type="email"
                        autoComplete="off"
                        className=" peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 "
                      />
                      <label
                        htmlFor="email"
                        className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Email<span className="text-[#FE6D00]">*</span>
                      </label>
                    </div>
                    <div className="relative  w-full min-w-[200px] ">
                      <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 "
                      />
                      <label
                        htmlFor="password"
                        className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Password <span className="text-[#FE6D00]">*</span>
                      </label>
                    </div>
                    <div className="relative  w-full min-w-[200px] ">
                      <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 "
                      />
                      <label
                        htmlFor="password"
                        className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Password <span className="text-[#FE6D00]">*</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full text-center bg-gray-800 text-white py-[13px] text-[24px] font-bold rounded-[17px] mt-[30px]">
                    Sign Up
                  </button>
                  <p className="mt-[14px] text-[16px] font-medium">
                    Sudah punya akun?{' '}
                    <Link
                      href={'/login'}
                      className="font-bold text-[#FE6D00] underline"
                    >
                      Masuk disini.
                    </Link>
                  </p>
                </form>
              </div>
            ) : (
              <div className="pt-[45px]">
                <form>
                  <div className="grid grid-cols-1 gap-[32px]">
                    <div className="relative  w-full min-w-[200px] ">
                      <input
                        id="email"
                        placeholder="Email"
                        type="email"
                        autoComplete="off"
                        className=" peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 "
                      />
                      <label
                        htmlFor="email"
                        className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Email<span className="text-[#FE6D00]">*</span>
                      </label>
                    </div>
                    <div className="relative  w-full min-w-[200px] ">
                      <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 "
                      />
                      <label
                        htmlFor="password"
                        className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Password <span className="text-[#FE6D00]">*</span>
                      </label>
                    </div>
                    <div className="relative  w-full min-w-[200px] ">
                      <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 "
                      />
                      <label
                        htmlFor="password"
                        className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                      >
                        Password <span className="text-[#FE6D00]">*</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full text-center bg-gray-800 text-white py-[13px] text-[24px] font-bold rounded-[17px] mt-[30px]">
                    Sign Up
                  </button>
                  <p className="mt-[14px] text-[16px] font-medium">
                    Sudah punya akun?{' '}
                    <Link
                      href={'/login'}
                      className="font-bold text-[#FE6D00] underline"
                    >
                      Masuk disini.
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
