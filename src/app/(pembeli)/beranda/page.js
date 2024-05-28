import Image from 'next/image';
import React from 'react';

import { IoIosSearch } from 'react-icons/io';

import hero from '../../../../public/assets/img/hero/image.png';
import Link from 'next/link';
import InputField from '@/components/forms/InputField';

export default function HomePage() {
  return (
    <div className=" w-full h-screen">
      <div className="absolute top-0 bottom-0 right-0 left-0 mx-auto -z-10  w-[1090px] h-[390px] mt-[94px] md:mt-[78px] inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_bottom,_black_0%,_black_calc(100%-300px),_transparent_100%)]">
        <Image
          width={0}
          height={0}
          alt="hero"
          src={hero}
          className="w-full object-cover object-bottom rounded-lg"
        />
      </div>

      <div className="mt-[255px]">
        <div className="w-full relative">
          <input
            className=" w-full py-[20px] pl-[53px] rounded-[8px]"
            placeholder="Search here..."
          />
          <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
            <IoIosSearch className="text-[24px] text-black " />
          </button>
        </div>
        <div className="mt-[30px] w-full bg-white rounded-lg">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="text-[20px] font-semibold items-center flex gap-5">
              Rekomendasi Toko{' '}
              <Link
                href={'#'}
                className="text-[#FE6D00] text-[13px] font-bold underline"
              >
                Lihat semua
              </Link>
            </h1>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
