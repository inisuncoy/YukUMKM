import Image from 'next/image';
import React from 'react';

import { IoIosSearch } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';

import hero from '../../../../public/assets/img/hero/image.png';
import Link from 'next/link';
import CardBlogLarge from '@/components/card/CardBlogLarge';
import CardBlogSmall from '@/components/card/CardBlogSmall';
import NextBreadcrumb from '@/components/NextBreadcrumb';
export default function BlogPAge() {
  return (
    <div className=" w-full">
      <div className="absolute top-0 bottom-0 right-0 left-0 mx-auto -z-10  max-w-[1090px] h-[390px] mt-[94px] md:mt-[78px] inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_bottom,_black_0%,_black_calc(100%-400px),_transparent_100%)]">
        <Image
          width={0}
          height={0}
          alt="hero"
          src={hero}
          className="w-full object-cover object-bottom lg:rounded-lg"
        />
      </div>

      <div className="mt-[255px] flex flex-col gap-[30px]">
        <div className="w-full relative">
          <input
            className=" w-full py-[20px] pl-[53px] rounded-[8px]"
            placeholder="Search here..."
          />
          <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
            <IoIosSearch className="text-[24px] text-black " />
          </button>
        </div>
        <NextBreadcrumb
          separator={
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          }
          capitalizeLinks
        />
        <div className=" w-full bg-white rounded-lg relative px-[22px] pb-5">
          <div className=" py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Blog
            </h1>
          </div>
          <div className=" flex flex-col gap-[30px]">
            <div className="rounded-lg shadow-xl flex lg:flex-row flex-col gap-[20px] lg:pr-[23px]">
              <Image
                width={0}
                height={0}
                alt="main-blog"
                src={hero}
                className="lg:max-w-[413px] max-h-[323px] lg:w-[413px] md:w-full lg:h-[323px]  object-cover lg:rounded-l-lg md:rounded-lg"
              />
              <div className="flex flex-col gap-[14px] justify-center lg:px-0 md:p-[12px] p-[12px]">
                <div>
                  <h1 className="font-semibold text-[16px]">
                    PSSI Ungkap Alasan Harga Tiket Timnas Indonesia Melonjak
                    Drastis
                  </h1>
                  <div className="text-[10px] flex gap-1 text-gray-400 items-center ">
                    <p className="md:block hidden">
                      <span>Syakirun Niam, </span>
                      <span>Syakirun Niam, </span>
                    </p>
                    <GoDotFill className="lg:block hidden" />
                    <span>16/05/2024, 15:07 WIB</span>
                  </div>
                </div>
                <p className="xl:text-[13px] lg:text-[11px] md:text-[12px] ">
                  KOMPAS.com - Anggota Komite Eksekutif (Exco) PSSI, Arya
                  Sinulingga, menjelaskan alasan adanya kenaikan signifikan
                  harga tiket laga timnas Indonesia untuk ronde laga Kualifikasi
                  Piala Dunia 2026 zona Asia. PSSI baru saja merilis harga tiket
                  resmi laga timnas Indonesia di Kualifikasi Piala Dunia 2026
                  yang diselenggarakan di Stadion Utama Gelora Bung Karno
                  (SUGBK) Juni mendatang. Indonesia akan melakoni duel melawan
                  Irak pada Kamis (6/6/2024) dan Filipina pada Selasa
                  (11/6/2024). Harga tiket laga timnas melonjak sangat tinggi,
                  bahkan hampir dua kali lipat dari laga terakhir timnas
                  Indonesia saat menjamu Vietnam masih di Kualifikasi Piala
                  Dunia 2022 pada 21 Maret lalu. Kala itu, kategori tiket
                  termurah dapat dibeli dengan harga Rp 100.000, sedangkan untuk
                  laga Indonesia vs Irak dan Filipina tiket termurah dijual
                  seharga Rp 250.000.
                </p>
              </div>
            </div>
            <div className="flex lg:gap-[33px] md:gap-[23px] gap-[13px] ">
              <CardBlogLarge />
              <CardBlogLarge />
            </div>
            <div className="flex flex-col gap-[30px]">
              <CardBlogSmall />
              <CardBlogSmall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
