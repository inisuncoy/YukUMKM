/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import request from '@/utils/request';

import { IoIosSearch } from 'react-icons/io';

import hero from '../../../../public/assets/img/hero/image.png';
import Link from 'next/link';
import CardProduct from '@/components/card/CardProduct';
import SwiperProduk from '@/components/swiper/SwiperProduk';
import CardProductV2 from '@/components/card/CardProductV2';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [productSallerDatas, setProductSallerDatas] = useState([]);
  const [sallerDatas, setSallerDatas] = useState();

  const fetchProductSaller = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get(`/public/item`);
      setProductSallerDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching product saller data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSaller = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get(`/public/seller`);
      setSallerDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching saller data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchSaller(), fetchProductSaller()]);
  }, [fetchSaller, fetchProductSaller]);

  return (
    <div className=" w-full h-screen">
      <div className="absolute top-0 bottom-0 right-0 left-0 mx-auto -z-10  max-w-[1090px] h-[390px] mt-[94px] md:mt-[78px] inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_bottom,_black_0%,_black_calc(100%-300px),_transparent_100%)]">
        <Image
          width={0}
          height={0}
          alt="hero"
          src={hero}
          loading="lazy"
          className="w-full object-cover object-bottom lg:rounded-lg"
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
        <div className="mt-[30px] w-full bg-white rounded-lg relative">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Rekomendasi Toko{' '}
              <Link
                href={'#'}
                className="text-[#FE6D00] text-[13px] font-bold underline"
              >
                Lihat semua
              </Link>
            </h1>
          </div>
          <div className="px-[20px]  pb-[32px] flex">
            <div className="flex lg:flex-row flex-col w-full lg:gap-[52px] md:gap-[12px] gap-[12px]">
              {sallerDatas &&
                sallerDatas.slice(0, 2).map((saller, i) => (
                  <div
                    key={i}
                    className="relative w-full flex md:flex-row items-end"
                  >
                    <div className="w-[218px] h-[269px] absolute">
                      <Image
                        loading="lazy"
                        width={0}
                        height={0}
                        alt="product-bg"
                        sizes="100vw"
                        src={
                          saller.profile_uri
                            ? process.env.NEXT_PUBLIC_HOST + saller.profile_uri
                            : '/assets/logo/logoUMKM.png'
                        }
                        // src={"/assets/logo/logoUMKM.png"}
                        className="w-full h-full object-cover object-bottom rounded-lg"
                      />
                    </div>
                    <div className="flex gap-4 z-10 w-full justify-end">
                      {/* <div> */}
                      {productSallerDatas
                        .filter((product) => saller.id === product.user_id)
                        .slice(0, 2)
                        .map(
                          (product, x) =>
                            saller.id === product.user_id && (
                              <CardProductV2
                                key={x}
                                name={product.name}
                                thumbnail={product.image_uri}
                                price={product.price}
                                seller={product.user.name}
                                href={`/toko/${product.user.name}/${product.name}`}
                              />
                            )
                        )}
                      {/* </div> */}
                      {/* <Link
                        href={'#'}
                        className="flex justify-end text-[#FE6D00] text-[13px] font-bold underline"
                      >
                        Lihat toko
                      </Link> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-[30px] w-full bg-white rounded-lg relative">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Barang - barang kekinian{' '}
              <Link
                href={'#'}
                className="text-[#FE6D00] text-[13px] font-bold underline"
              >
                Lihat semua
              </Link>
            </h1>
          </div>
          <div className="px-[20px] pb-[32px] flex">
            {<SwiperProduk datas={productSallerDatas} />}
          </div>
        </div>
      </div>
    </div>
  );
}
