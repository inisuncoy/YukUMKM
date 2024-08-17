/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { IoIosSearch } from 'react-icons/io';

import { useDebounce } from 'use-debounce';

import SwiperProduk from '@/components/swiper/SwiperProduk';
import Loading from '@/components/Loading';
import CardProductV2 from '@/components/card/CardProductV2';
import CardProductSmall from '@/components/card/CardProductSmall';

import request from '@/utils/request';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [productSellerDatas, setProductSellerDatas] = useState([]);
  const [sellerDatas, setSellerDatas] = useState();
  const [showAllSeller, setShowAllSeller] = useState(false);
  const [showAllProduct, setShowAllProduct] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [queryProduct, setQueryProduct] = useState('');

  const [queryProductValue] = useDebounce(queryProduct, 500);

  const fetchProductSeller = useCallback(async () => {
    let payload = {
      name_insensitive: queryProductValue,
      status: true,
      sortBy: 'totalVisited',
      sortDirection: 'desc',
      limit: 20,
    };
    try {
      const response = await request.get(`/public/item`, payload);
      setProductSellerDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [queryProductValue]);

  const fetchSeller = useCallback(async () => {
    let payload = {
      limit: 4,
      sortBy: 'avgRating',
      sortDirection: 'desc',
    };
    try {
      const response = await request.get(`/public/seller`, payload);
      setSellerDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching seller data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (queryProductValue) {
      fetchProductSeller();
      setModalSearch(true);
    } else {
      setModalSearch(false);
    }
    Promise.all([fetchSeller(), fetchProductSeller()]);
  }, [fetchSeller, fetchProductSeller, queryProductValue]);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 2401) {
        setItemsToShow(5);
      } else if (window.innerWidth >= 2124) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 1829) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 1024) {
        setItemsToShow(2);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 529) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    window.addEventListener('resize', updateItemsToShow);
    updateItemsToShow();
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" w-full ">
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

      <div className="mt-[255px] ">
        <div className="w-full relative">
          <input
            value={queryProduct}
            onChange={(e) => setQueryProduct(e.target.value)}
            className=" w-full py-[20px] pl-[53px] rounded-[8px]"
            placeholder="Search here..."
          />
          <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
            <IoIosSearch className="text-[24px] text-black " />
          </button>
        </div>
        {modalSearch ? (
          <div className="mt-[30px] w-full  rounded-lg relative overflow-y-auto h-[350px]">
            <div className="grid grid-cols-1 divide-y bg-white rounded-lg">
              {productSellerDatas &&
                productSellerDatas.map((data, i) => (
                  <CardProductSmall
                    key={i}
                    href={`/toko/${data.user.slug}/${data.slug}`}
                    src={data.image_uri}
                    titleProduct={data.name}
                    price={data.price}
                    seller={data.user.name}
                  />
                ))}
            </div>
          </div>
        ) : (
          <>
            <div
              className={`mt-[30px] w-full bg-white rounded-lg relative ${
                modalSearch ? 'hidden' : ''
              }`}
            >
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
              <div className="px-[20px]  pb-[32px] flex ">
                <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-[16px] w-full lg:gap-[52px] md:gap-[12px] gap-[12px]">
                  {sellerDatas &&
                    (showAllSeller ? sellerDatas : sellerDatas.slice(0, 2))
                      .filter((dataItems) => dataItems.items.length > 0)
                      .map((seller, i) => (
                        <div key={i} className="w-full ">
                          <div className=" relative w-full md:flex md:flex-row items-center">
                            <div className="w-[218px] h-[330px] ">
                              <Image
                                loading="lazy"
                                width={0}
                                height={0}
                                alt="product-bg"
                                sizes="100vw"
                                src={
                                  seller.profile_uri
                                    ? process.env.NEXT_PUBLIC_HOST +
                                      seller.profile_uri
                                    : '/assets/logo/logoUMKM.png'
                                }
                                className="w-full h-full object-cover object-bottom rounded-lg"
                              />
                            </div>
                            <div className="flex flex-col gap-2 right-0 bottom-0 items-end absolute  w-full">
                              <div className="text-gray-800 hidden md:flex text-[16px] font-bold w-full pl-[225px] items-center gap-2">
                                <Image
                                  width={0}
                                  height={0}
                                  sizes="100vw"
                                  alt="product"
                                  loading="lazy"
                                  src={'/assets/icon/icon-toko.png'}
                                  className="w-[15px] h-[15px] object-cover"
                                />
                                <p>{seller.name}</p>
                              </div>
                              <div className="flex  gap-4 z-10 w-full  justify-end ">
                                {seller.items
                                  .slice(0, itemsToShow)
                                  .map((product, x) => (
                                    <CardProductV2
                                      key={x}
                                      name={product.name}
                                      thumbnail={product.image_uri}
                                      price={product.price}
                                      seller={seller.name}
                                      href={`/toko/${seller.slug}/${product.slug}`}
                                      sizeImg={'w-[145px] h-[145px]'}
                                    />
                                  ))}
                              </div>
                              <Link
                                href={`/toko/${seller.slug}`}
                                className="text-[#FE6D00] text-[13px] font-bold underline focus:outline-none focus:ring focus:ring-transparent"
                              >
                                Lihat Toko
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div
              className={`mt-[30px] w-full bg-white rounded-lg relative ${
                modalSearch ? 'hidden' : ''
              }`}
            >
              <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
                <span className="border-2 rounded-full border-[#4DBB8D]"></span>
                <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                  Barang Kekinian{' '}
                  <button
                    onClick={() => setShowAllProduct(!showAllProduct)}
                    className="text-[#FE6D00] text-[13px] font-bold underline focus:outline-none focus:ring focus:ring-transparent"
                  >
                    {showAllProduct ? 'Tampilkan sedikit' : 'Lihat semua'}
                  </button>
                </h1>
              </div>
              {showAllProduct ? (
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-[25px] md:gap-[30px] sm:gap-[20px] gap-[10px] px-4 pb-4">
                  {productSellerDatas.map((data, i) => (
                    <CardProductV2
                      key={i}
                      name={data.name}
                      thumbnail={data.image_uri}
                      price={data.price}
                      seller={data.user.name}
                      href={`/toko/${data.user.slug}/${data.slug}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-4 pb-4 flex">
                  {productSellerDatas && (
                    <SwiperProduk datas={productSellerDatas} />
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
