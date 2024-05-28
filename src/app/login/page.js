'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import bg1 from '../../../public/assets/img/bg/bg1.png';
import logo1 from '../../../public/assets/img/logo/logo1.png';
import Link from 'next/link';
import InputField from '@/components/forms/InputField';

function Login() {
  const [menu, setMenu] = useState(true);
  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
        <div className={`w-[550px] 'h-[550px] flex flex-col gap-[19px]`}>
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="">Login</h1>
          </div>
          <div className="px-[30px] pt-[33px] pb-[48px] h-full  bg-white rounded-[8px]">
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
              <div className="pt-[45px] ">
                <form>
                  <div className="grid grid-cols-1 gap-[32px]">
                    <InputField
                      id={'email'}
                      name={'email'}
                      value={email}
                      label={'Email'}
                      placeholder={'Email'}
                      type={'email'}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      validations={validations}
                    />
                    <InputField
                      id={'password'}
                      name={'password'}
                      value={password}
                      label={'Password'}
                      placeholder={'Password'}
                      type={'password'}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      validations={validations}
                    />
                  </div>
                  <p className="mt-[14px] text-[16px] font-medium">
                    Lupa kata sandi?{' '}
                    <Link
                      href={'/'}
                      className="font-bold text-[#FE6D00] underline"
                    >
                      Hubungi Kami
                    </Link>
                  </p>
                  <button className="w-full text-center bg-gray-800 text-white py-[13px] text-[24px] font-bold rounded-[17px] mt-[30px]">
                    Sign In
                  </button>
                  <p className="mt-[14px] text-[16px] font-medium">
                    Tidak punya akun?{' '}
                    <Link
                      href={'/register'}
                      className="font-bold text-[#FE6D00] underline"
                    >
                      Buat akun sekarang disini.
                    </Link>
                  </p>
                </form>
              </div>
            ) : (
              <div className="pt-[45px]">
                <form>
                  <div className="grid grid-cols-1 gap-[32px]">
                    <InputField
                      id={'email'}
                      name={'email'}
                      value={email}
                      label={'Email'}
                      placeholder={'Email'}
                      type={'email'}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      validations={validations}
                    />
                    <InputField
                      id={'password'}
                      name={'password'}
                      value={password}
                      label={'Password'}
                      placeholder={'Password'}
                      type={'password'}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      validations={validations}
                    />
                  </div>
                  <p className="mt-[14px] text-[16px] font-medium">
                    Lupa kata sandi?{' '}
                    <Link
                      href={'/'}
                      className="font-bold text-[#FE6D00] underline"
                    >
                      Hubungi Kami
                    </Link>
                  </p>
                  <button className="w-full text-center bg-gray-800 text-white py-[13px] text-[24px] font-bold rounded-[17px] mt-[30px]">
                    Sign In
                  </button>
                  <p className="mt-[14px] text-[16px] font-medium">
                    Tidak punya akun?{' '}
                    <Link
                      href={'/register'}
                      className="font-bold text-[#FE6D00] underline"
                    >
                      Buat akun sekarang disini.
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

export default Login;
