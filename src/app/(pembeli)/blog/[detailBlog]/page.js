/* eslint-disable react/no-unescaped-entities */
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Image from 'next/image';
import React from 'react';
import thumnail from '../../../../../public/assets/uploads/blog/blog1.png';

const DetailBlogPage = () => {
  return (
    <div className="flex flex-col gap-[30px]">
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
      <div className=" py-[18px] px-[16px] flex gap-[17px] bg-white rounded-[8px]">
        <span className="border-2 rounded-full border-[#FE6D00]"></span>
        <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
          Blog
        </h1>
      </div>
      <div className=" p-[32px]  bg-white rounded-[8px]">
        <h1 className="md:text-[40px] text-[26px] font-semibold items-center flex gap-5">
          PSSI Ungkap Alasan Harga Tiket Timnas Indonesia Melonjak Drastis
        </h1>
        <div className="text-[15px] font-medium flex flex-col  gap-1 text-gray-400  ">
          <p className="text-[15px] font-medium">16/05/2024, 15:07 WIB</p>
          <p className="text-[20px] font-medium">
            Ditulis oleh Syakirun Ni'am, Dani Prabowo
          </p>
        </div>
        <div className="h-[35px]"></div>
        <div className="flex flex-col gap-[30px]">
          <Image
            width={0}
            height={0}
            alt="thumnail"
            src={thumnail}
            className="w-full"
          />
          <p className="xl:text-[20px]">
            KOMPAS.com - Anggota Komite Eksekutif (Exco) PSSI, Arya Sinulingga,
            menjelaskan alasan adanya kenaikan signifikan harga tiket laga
            timnas Indonesia untuk ronde laga Kualifikasi Piala Dunia 2026 zona
            Asia. PSSI baru saja merilis harga tiket resmi laga timnas Indonesia
            di Kualifikasi Piala Dunia 2026 yang diselenggarakan di Stadion
            Utama Gelora Bung Karno (SUGBK) Juni mendatang. Indonesia akan
            melakoni duel melawan Irak pada Kamis (6/6/2024) dan Filipina pada
            Selasa (11/6/2024). Harga tiket laga timnas melonjak sangat tinggi,
            bahkan hampir dua kali lipat dari laga terakhir timnas Indonesia
            saat menjamu Vietnam masih di Kualifikasi Piala Dunia 2022 pada 21
            Maret lalu. Kala itu, kategori tiket termurah dapat dibeli dengan
            harga Rp 100.000, sedangkan untuk laga Indonesia vs Irak dan
            Filipina tiket termurah dijual seharga Rp 250.000.
          </p>
        </div>
        <div className="h-[96px]"></div>
        <div className="flex flex-col gap-[29px]">
          <h1 className="text-[16px] font-semibold">
            TINGGALKAN KOMENTAR ANDA
          </h1>
          <div className="border border-black rounded-lg">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 rounded-t-lg  border-b border-t-0 border-x-0 border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <div className="flex flex-col gap-[42px] px-[30px] py-[20px] border-b border-black">
              <h1 className="text-[20px] ">
                Masuk terlebih dahulu menggunakan email untuk dapat meninggalkan
                komentar.
              </h1>
              <div>
                <button className="px-[42px] py-[14px] bg-black text-white rounded-lg ">
                  Masuk
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-[42px] px-[30px] py-[20px] ">
              <div>
                <button className="px-[32px] py-[11px] bg-white border border-black text-black rounded-lg ">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlogPage;
