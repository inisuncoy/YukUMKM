import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import Image from 'next/image';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';

const CardBlogLarge = () => {
  return (
    <Link
      href={
        '/blog/PSSI Ungkap Alasan Harga Tiket Timnas Indonesia Melonjak Drastis'
      }
      className=" bg-white border border-gray-200 rounded-lg shadow "
    >
      <Image
        width={0}
        height={0}
        alt=""
        src={blog}
        className="w-full h-fullrounded-t-lg"
      />
      <div className="lg:p-[16px] md:p-[12px] p-[8px]">
        <a href="#">
          <h5 className="mb-[3px] md:text-[16px] text-[12px] font-semibold tracking-tight text-gray-900 ">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <div className="text-[10px] flex lg:flex-row md:flex-col gap-1 text-gray-400 lg:items-center ">
          <p className="md:block hidden">
            <span>Syakirun Niam, </span>
            <span>Syakirun Niam, </span>
          </p>
          <GoDotFill className="lg:block hidden" />
          <span>16/05/2024, 15:07 WIB</span>
        </div>
      </div>
    </Link>
  );
};

export default CardBlogLarge;
