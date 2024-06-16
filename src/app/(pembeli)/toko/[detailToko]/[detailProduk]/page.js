import NextBreadcrumb from '@/components/NextBreadcrumb';
import Image from 'next/image';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import preview from '../../../../../../public/assets/uploads/product/product1.png';
import instagram from '../../../../../../public/assets/icon/instagram.png';
import whatshapp from '../../../../../../public/assets/icon/whatshapp.png';
import facebook from '../../../../../../public/assets/icon/facebook.png';
import { GoDotFill } from 'react-icons/go';
import CardProduct from '@/components/card/CardProduct';
export async function generateStaticParams() {
  return [{ detailToko: 'Inod’s Crafthouse', detailProduk: 'Keranjang kayu' }];
}

const DetailProdukPage = ({ params }) => {
  return (
    <div className="flex flex-col gap-[19px]">
      <div className="w-full relative ">
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
      <div className=" w-full bg-white rounded-lg relative px-[22px] pb-5 pt-[33px]">
        <div className="flex gap-[17px] bg-white rounded-[8px]">
          <span className="border-2 rounded-full border-[#FE6D00]"></span>
          <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
            Halaman Produk
          </h1>
        </div>
        <div className="h-[52px]"></div>
        <div className="flex lg:flex-row flex-col gap-[24px] items-center bg-white  rounded-lg ">
          <div className="flex flex-col gap-[25px] lg:max-w-[210px] w-full items-center ">
            <Image
              width={0}
              height={0}
              alt=""
              src={preview}
              className="lg:max-w-[210px] lg:max-h-[210px] w-full object-cover"
            />
            <div className="flex justify-between w-full lg:gap-0 md:gap-[54px]">
              <Image
                width={0}
                height={0}
                alt=""
                src={preview}
                className="lg:w-[56px] lg:h-[56px] md:w-[130px] md:h-[130px] w-[94px] h-[94px] object-cover"
              />
              <Image
                width={0}
                height={0}
                alt=""
                src={preview}
                className="lg:w-[56px] lg:h-[56px] md:w-[130px] md:h-[130px] w-[94px] h-[94px] object-cover"
              />
              <Image
                width={0}
                height={0}
                alt=""
                src={preview}
                className="lg:w-[56px] lg:h-[56px] md:w-[130px] md:h-[130px] w-[94px] h-[94px] object-cover"
              />
            </div>
          </div>
          <div className="h-full w-full flex flex-col  lg:pl-[58px] md:pl-[20px] pl-[12px] md:pr-[12px] md:gap-[14px] gap-[16px] leading-normal">
            <div className="grow">
              <div>
                <h1 className="text-[24px] font-semibold">Keranjang Kayu</h1>
                <h1 className="text-[30px] font-semibold">Rp200.000</h1>
              </div>
              <div>
                <p className="xl:text-[16px] lg:text-[15px] md:text-[12px] text-[13px]">
                  Deskripsi Produk
                </p>
                <p className="xl:text-[16px] lg:text-[15px] md:text-[12px] text-[13px]">
                  Keranjang kayu serbaguna ini menambah nuansa alami dan elegan.
                  Terbuat dari kayu solid berkualitas, ideal untuk menyimpan
                  berbagai barang. Ukuran 40x30x25 cm, ramah lingkungan, dan
                  buatan tangan. Harga Rp 200.000,-. Tambahkan sentuhan alami ke
                  rumah Anda!
                </p>
              </div>
              <div className="text-[14px] font-bold text-[#FE6D00]">
                Lihat selengkapnya
              </div>
            </div>
            <div className="grow-0 ">
              <button className="w-full text-center bg-[#1D1D1D] text-white text-[16px] font-semibold py-[14px] rounded-lg">
                Hubungi Penjual
              </button>
            </div>
            <div className="flex md:flex-row flex-col xl:gap-[41px] lg:gap-[31px] md:gap-[21px] gap-[11px] ">
              <div className="flex gap-[28px]  items-center">
                <Image
                  width={0}
                  height={0}
                  alt="instagram"
                  src={instagram}
                  className="max-w-[27px] max-h-[27px] "
                />
                <h1>@inodcrafthouse</h1>
              </div>
              <div className="flex gap-[28px] items-center">
                <Image
                  width={0}
                  height={0}
                  alt="whatshapp"
                  src={whatshapp}
                  className="max-w-[27px] max-h-[27px] "
                />
                <h1>082132986374</h1>
              </div>
              <div className="flex gap-[28px] items-center">
                <Image
                  width={0}
                  height={0}
                  alt="facebook"
                  src={facebook}
                  className="max-w-[27px] max-h-[27px] "
                />
                <h1>Inod Crafthouse</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[58px]" />
        <div className="flex gap-[17px] bg-white rounded-[8px]">
          <span className="border-2 rounded-full border-[#4DBB8D]"></span>
          <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
            Produk Lainnya
          </h1>
        </div>
        <div className="h-[15px]" />
        <div className="grid  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-x-[16px] xl:gap-y-[46px] lg:gap-x-[30px] lg:gap-y-[46px] md:gap-12 gap-8  lg:px-[62px] pb-4">
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
    </div>
  );
};

export default DetailProdukPage;
