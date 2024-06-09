import Image from 'next/image';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';

import LogoUMKM from '../../../../../public/assets/uploads/toko/logoUMKM.png';
import CardProduct from '@/components/card/CardProduct';
import NextBreadcrumb from '@/components/NextBreadcrumb';
export async function generateStaticParams() {
  return [{ detailToko: 'Inod’s Crafthouse' }];
}

const DetailTokoPage = ({ params }) => {
  return (
    <div className="flex flex-col gap-[19px]">
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
      <div className="w-full p-[17px] bg-white rounded-lg flex md:flex-row flex-col  gap-[16px]">
        <Image
          width={0}
          height={0}
          alt="profile-toko"
          src={LogoUMKM}
          className="md:w-[281px] md:h-[296px] object-cover rounded-lg"
        />
        <div className="flex flex-col lg:gap-0 gap-5">
          <div className="flex flex-col gap-[12px] grow">
            <div>
              <h1 className="font-semibold text-[40px]">Inod’s Crafthouse</h1>
              <div className="flex gap-[9px] items-center">
                <MdLocationOn className="text-[#E21B1B] text-[22px]" />
                <p className="text-[16px] font-bold">Klaten, Jawa Tengah</p>
              </div>
            </div>
            <p className="text-[13px] ">
              Oki mart merupakan perusahaan teknologi Indonesia dengan misi
              pemerataan ekonomi secara digital di Indonesia. Visi perusahaan
              adalah untuk menciptakan ekosistem di mana siapa pun bisa memulai
              dan menemukan apa pun. Hingga saat ini, Tokopedia termasuk
              marketplace yang paling banyak dikunjungi oleh masyarakat
              Indonesia.
            </p>
          </div>
          <div className="grow-0 flex">
            <button className="w-full text-center bg-[#1D1D1D] text-white text-[16px] font-semibold py-[14px] rounded-lg">
              Hubungi Penjual
            </button>
            <button className="w-full text-center bg-white border-2 border-black text-black text-[16px] font-semibold py-[14px] rounded-lg">
              Beri Penilaian
            </button>
          </div>
        </div>
      </div>

      <div className="xl:pl-[148px] lg:pl-[258px] md:pl-[] lg:pr-[20px] w-full lg:bg-white rounded-lg relative flex flex-col-reverse gap-5">
        <div className="bg-white rounded-lg">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Produk
            </h1>
          </div>
          <div className="h-[15px]" />
          <div className="grid  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-[16px] lg:gap-[8px] md:gap-12 gap-8  px-4 pb-4">
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
            <div className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg">
              <CardProduct />
            </div>
          </div>
        </div>
        <div className="lg:w-[280px] lg:h-[520px] bg-white lg:shadow-2xl lg:absolute lg:top-0 xl:-left-[134px] lg:-left-[24px] rounded-lg lg:pb-0 md:pb-5">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Filter
            </h1>
          </div>
          <div className="flex lg:flex-col flex-row  lg:gap-[8px] ">
            <fieldset className="w-full">
              <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Type
              </legend>

              <div className="space-y-2 px-5 py-6">
                <div className="flex items-center">
                  <input
                    id="New"
                    type="checkbox"
                    name="type[New]"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <label for="New" className="ml-3 text-sm font-medium">
                    {' '}
                    New{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Used"
                    type="checkbox"
                    name="type[Used]"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <label for="Used" className="ml-3 text-sm font-medium">
                    {' '}
                    Used{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Branded"
                    type="checkbox"
                    name="type[Branded]"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <label for="Branded" className="ml-3 text-sm font-medium">
                    {' '}
                    Branded{' '}
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                  >
                    Reset Type
                  </button>
                </div>
              </div>
            </fieldset>
            <fieldset className="w-full">
              <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Type
              </legend>

              <div className="space-y-2 px-5 py-6">
                <div className="flex items-center">
                  <input
                    id="New"
                    type="checkbox"
                    name="type[New]"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <label for="New" className="ml-3 text-sm font-medium">
                    {' '}
                    New{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Used"
                    type="checkbox"
                    name="type[Used]"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <label for="Used" className="ml-3 text-sm font-medium">
                    {' '}
                    Used{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Branded"
                    type="checkbox"
                    name="type[Branded]"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <label for="Branded" className="ml-3 text-sm font-medium">
                    {' '}
                    Branded{' '}
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                  >
                    Reset Type
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTokoPage;
