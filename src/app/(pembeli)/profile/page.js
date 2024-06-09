'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import defaultProfile from '../../../../public/assets/uploads/profile/defaultProfile.png';
import InputField from '@/components/forms/InputField';

const ProfilePage = () => {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <div className=" w-full bg-white rounded-lg relative">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Profile
            </h1>
          </div>
        </div>
        <div className="xl:px-[200px]">
          <div className="bg-white p-[20px] rounded-lg flex flex-col gap-[21px]">
            <div className="flex gap-[27px] lg:flex-row flex-col">
              <div className="py-[20px] px-[40px] rounded-lg shadow-xl flex flex-col gap-[40px]">
                <div className="lg:w-[185px] h-[185px] flex justify-center items-center">
                  <Image
                    width={0}
                    height={0}
                    alt="profile"
                    src={defaultProfile}
                    className="w-[127px] h-[127px] "
                  />
                </div>
                <label
                  htmlFor="profile"
                  className="cursor-pointer rounded-lg flex justify-center items-center px-[55px] py-[10px] text-white font-bold text-[16px] bg-[#6366F1]"
                >
                  Pilih Foto
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  className="hidden"
                />
              </div>
              <div className="flex flex-col gap-[21px]">
                <div className="flex gap-[17px] bg-white rounded-[8px]">
                  <span className="border-2 rounded-full border-[#FE6D00]"></span>
                  <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                    Biodata Diri
                  </h1>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Nama</h1>
                  <p className="text-[13px] font-normal">Jajang Sutejo</p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Alamat</h1>
                  <p className="text-[13px] font-normal">
                    Gading Serpong, Jl. Boulevard Raya Gading Serpong, Pakulonan
                    Bar., Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[9px] justify-center items-center">
              <button
                onClick={() => setMenuActive(!menuActive)}
                className="bg-[#6366F1] text-[16px] font-bold text-white py-[10px] w-[352px] rounded-lg"
              >
                Ubah Biodata
              </button>
              <button className="bg-[#FF3D00] text-[16px] font-bold text-white py-[10px] w-[352px] rounded-lg">
                Keluar Akun
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setMenuActive(!menuActive)}
        className={`fixed w-full h-screen backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center items-center ${
          menuActive ? '' : 'hidden'
        }`}
      >
        <div
          className="w-[694px] flex flex-col gap-[14px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" w-full bg-white rounded-lg relative">
            <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
              <span className="border-2 rounded-full border-[#FE6D00]"></span>
              <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                Profile
              </h1>
            </div>
          </div>
          <div className=" w-full bg-white rounded-lg relative p-[20px] flex flex-col gap-[43px]">
            <div className="grid grid-cols-1 gap-[32px]">
              <InputField
                id={'nama'}
                name={'nama'}
                // value={nama}
                label={'Nama'}
                placeholder={'Nama'}
                type={'text'}
                // onChange={(e) => setEmail(e.target.value)}
                required
                // validations={validations}
              />
              <InputField
                id={'alamat'}
                name={'alamat'}
                // value={alamat}
                label={'Alamat'}
                placeholder={'Alamat'}
                type={'text'}
                // onChange={(e) => setPassword(e.target.value)}
                required
                // validations={validations}
              />
            </div>
            <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg">
              Konfirmasil
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
