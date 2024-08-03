/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import { IoIosSearch } from 'react-icons/io';

import SwiperProduk from '@/components/swiper/SwiperProduk';
import CardProductV2 from '@/components/card/CardProductV2';
import CardTokoV2 from '@/components/card/CardTokoV2';

import request from '@/utils/request';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [productSallerDatas, setProductSallerDatas] = useState([]);
  const [sallerDatas, setSallerDatas] = useState();
  const [showAllSeller, setShowAllSeller] = useState(false);
  const [showAllProduct, setShowAllProduct] = useState(false);

  const fetchProductSaller = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get(`/public/item`);
      setProductSallerDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          src={'/assets/img/hero/image.png'}
          sizes="100vw"
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
              <button
                onClick={() => setShowAllSeller(!showAllSeller)}
                className="text-[#FE6D00] text-[13px] font-bold underline focus:outline-none focus:ring focus:ring-transparent"
              >
                {showAllSeller ? 'Tampilkan sedikit' : 'Lihat semua'}
              </button>
            </h1>
          </div>
          <div className="px-[20px]  pb-[32px] flex">
            <div className="grid grid-cols-2  md:grid-cols-1 lg:grid-cols-2 gap-x-[16px] w-full lg:gap-[52px] md:gap-[12px] gap-[12px]">
              {sallerDatas &&
                (showAllSeller
                  ? sallerDatas.slice(0, 4)
                  : sallerDatas.slice(0, 2)
                ).map((saller, i) => (
                  <div key={i}>
                    <div className="hidden relative w-full md:flex md:flex-row items-center">
                      <div className="w-[218px] h-[269px] ">
                        <Image
                          loading="lazy"
                          width={0}
                          height={0}
                          alt="product-bg"
                          sizes="100vw"
                          src={
                            saller.profile_uri
                              ? process.env.NEXT_PUBLIC_HOST +
                                saller.profile_uri
                              : '/assets/logo/logoUMKM.png'
                          }
                          className="w-full h-full object-cover object-bottom rounded-lg"
                        />
                      </div>
                      <div className="flex gap-4 z-10 w-full justify-end absolute ">
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
                                  href={`/toko/${saller.slug}/${product.slug}`}
                                  sizeImg={'w-[145px] h-[145px]'}
                                />
                              )
                          )}
                      </div>
                    </div>

                    <CardTokoV2
                      href={`/toko/${saller.slug}`}
                      logo={saller.profile_uri}
                      name={saller.name}
                      className={'md:hidden block'}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-[30px] w-full bg-white rounded-lg relative">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[14px] font-semibold items-center flex gap-5">
              Barang Kekinian{' '}
              <button
                onClick={() => setShowAllProduct(!showAllProduct)}
                className="text-[#FE6D00] text-[10px] md:text-[13px] font-bold underline focus:outline-none focus:ring focus:ring-transparent"
              >
                {showAllProduct ? 'Tampilkan sedikit' : 'Lihat semua'}
              </button>
            </h1>
          </div>
          {showAllProduct ? (
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-4 lg:gap-[8px] md:gap-12 gap-8 px-4 pb-4">
              {productSallerDatas.map((data, i) => (
                <CardProductV2
                  key={i}
                  name={data.name}
                  thumbnail={data.image_uri}
                  price={data.price}
                  seller={data.user.name}
                  href={`/toko/${data.user.name}/${data.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 pb-4 flex">
              {productSallerDatas && (
                <SwiperProduk datas={productSallerDatas} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
