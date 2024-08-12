'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import bg1 from '../../../public/assets/img/bg/bg1.png';
import logo1 from '../../../public/assets/img/logo/logo1.png';
import Link from 'next/link';
import InputField from '@/components/forms/InputField';
import toast from 'react-hot-toast';
import request from '@/utils/request';
import FormulirOTP from '@/components/modal/FormulirOTP';

function Login() {
  const [menu, setMenu] = useState(true);

  const [validations, setValidations] = useState([]);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalOtp, setModalOtp] = useState(false);

  const onSubmit = async (e) => {
    setValidations([]);
    toast.loading('Loading...');
    e.preventDefault();

    try {
      const validation = formSchema.safeParse({
        email: email,
        password: password,
      });

      if (!validation.success) {
        validation.error.errors.map((validation) => {
          const key = [
            {
              name: validation.path[0],
              message: validation.message,
            },
          ];
          setValidations((validations) => [...validations, ...key]);
        });
        toast.dismiss();
        toast.error('Invalid Input.');
        return;
      }
    } catch (error) {
      console.error(error);
    }
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    request
      .post(menu ? '/auth/buyer/login' : '/auth/seller/login', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          setModalOtp(true);
        }
      })
      .catch(function (error) {
        if (
          error.response?.data?.code === 400 &&
          error.response?.data.status == 'VALIDATION_ERROR'
        ) {
          setValidations(error.response?.data.error?.validation);
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 401 &&
          error.response?.data.status == 'UNAUTHORIZED'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          console.error('INTERNAL_SERVER_ERROR');
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
      });
  };

  return (
    <>
      <div className="lg:px-[32px] flex">
        <div className="relative hidden lg:block">
          <div className=" h-screen w-[605px] overflow-hidden">
            <div className="grid grid-cols-2 gap-[29px] grid-flow-row-dense">
              <div className="bg-gray-500 rounded-b-[20px] row-span-5">
                <Image
                  width={0}
                  height={0}
                  alt="background"
                  loading="lazy"
                  sizes="100vw"
                  src={bg1}
                  className="w-full h-full object-cover rounded-b-[20px]"
                />
              </div>
              <div className="bg-gray-500 rounded-b-[20px] row-span-12">
                <Image
                  width={0}
                  height={0}
                  alt="background"
                  loading="lazy"
                  sizes="100vw"
                  src={bg1}
                  className="w-full h-full object-cover rounded-b-[20px]"
                />
              </div>
              <div className="bg-gray-500 rounded-[20px] row-span-12">
                <Image
                  width={0}
                  height={0}
                  alt="background"
                  loading="lazy"
                  sizes="100vw"
                  src={bg1}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </div>
              <div className="bg-gray-500 rounded-[20px] row-span-12">
                <Image
                  width={0}
                  height={0}
                  alt="background"
                  loading="lazy"
                  sizes="100vw"
                  src={bg1}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </div>
              <div className="bg-gray-500 rounded-[20px] row-span-12">
                <Image
                  width={0}
                  height={0}
                  loading="lazy"
                  sizes="100vw"
                  alt="background"
                  src={bg1}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </div>
              <div className="bg-gray-500 rounded-[20px] row-span-12">
                <Image
                  width={0}
                  height={0}
                  alt="background"
                  loading="lazy"
                  sizes="100vw"
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
              loading="lazy"
              sizes="100vw"
              alt="background"
              src={logo1}
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>
        <div className="w-full h-screen  flex justify-center lg:justify-start items-center px-5 lg:px-[63px]">
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
              <div className="pt-[45px] ">
                <form onSubmit={onSubmit}>
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
            </div>
          </div>
        </div>
      </div>

      {modalOtp && (
        <FormulirOTP
          email={email}
          href={menu ? '/beranda' : '/produk'}
          toastSuccess={'Success Login'}
        />
      )}
    </>
  );
}

export default Login;
