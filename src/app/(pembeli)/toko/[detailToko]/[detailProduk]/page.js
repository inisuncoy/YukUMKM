/* eslint-disable @next/next/no-img-element */
'use client';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import preview from '../../../../../../public/assets/img/product/product1.png';
import instagram from '../../../../../../public/assets/icon/instagram.png';
import whatsapp from '../../../../../../public/assets/icon/whatshapp.png';
import facebook from '../../../../../../public/assets/icon/facebook.png';
import request from '@/utils/request';
import { NumberFormat } from '@/utils/numberFormat';
import { useRouter } from 'next/navigation';
import CardProductV2 from '@/components/card/CardProductV2';

const DetailProdukPage = ({ params }) => {
  const router = useRouter();

  const { detailToko, detailProduk } = params;
  const [productSellerById, setProductSellerById] = useState();
  const [productSellerDatas, setProductSellerDatas] = useState();
  const [loading, setLoading] = useState(false);
  const [hoverImg, setHoverImg] = useState('');

  // Jika ada gambar yang di-hover, gunakan gambar tersebut, jika tidak, gunakan gambar default
  const mainImageSrc = hoverImg
    ? process.env.NEXT_PUBLIC_HOST + hoverImg
    : productSellerById?.image_uri
    ? process.env.NEXT_PUBLIC_HOST + productSellerById.image_uri
    : '/assets/img/product/product1.png';

  const fetchProductSellerById = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get(`/public/item?slug=${detailProduk}`);
      setProductSellerById(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product saller data:', error);
      setLoading(false);
      router.back();
    } finally {
      setLoading(false);
    }
  }, [detailProduk, router]);

  const fetchProductSeller = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get(`/public/item`);
      setProductSellerDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product saller data:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchProductSeller(), fetchProductSellerById()]);
  }, [fetchProductSeller, fetchProductSellerById]);

  console.log(hoverImg);

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
        {productSellerById && (
          <div className="flex lg:flex-row flex-col items-center bg-white rounded-lg mx-3 gap-y-6 gap-x-12">
            <div className="flex flex-col gap-[25px] lg:max-w-[210px] w-full items-center ">
              <div className="relative w-[220px] h-[220px]  flex-shrink-0">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                  alt="main-product-img"
                  src={mainImageSrc}
                  className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                />
              </div>

              <div className="flex justify-between w-full lg:gap-0 md:gap-[54px]">
                {productSellerById &&
                  productSellerById.item_image &&
                  productSellerById?.item_image.map((data, i) => (
                    <div
                      key={i}
                      onMouseOver={(e) => {
                        e.preventdefault, setHoverImg(data.uri);
                      }}
                      onMouseOut={() => setHoverImg('')}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    >
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="detail-product-img"
                        src={
                          data.uri
                            ? process.env.NEXT_PUBLIC_HOST + data.uri
                            : '/assets/img/product/product1.png'
                        }
                        className="lg:w-[56px] lg:h-[56px] md:w-[130px] md:h-[130px] w-[94px] h-[94px] object-cover rounded-lg "
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="h-full w-full flex flex-col  md:gap-[14px] gap-[16px] leading-normal">
              <div className="grow">
                <div>
                  <h1 className="text-[24px] font-semibold">
                    {productSellerById.name}
                  </h1>
                  <h1 className="text-[30px] font-semibold">
                    {NumberFormat(productSellerById.price)}
                  </h1>
                </div>
                <div>
                  <p className="xl:text-[16px] lg:text-[15px] md:text-[12px] text-[13px]">
                    Deskripsi Produk
                  </p>
                  <p className="xl:text-[16px] lg:text-[15px] md:text-[12px] text-[13px]">
                    {productSellerById.description}
                  </p>
                </div>
                <div className="text-[14px] font-bold text-[#FE6D00] mt-[3px]">
                  Lihat selengkapnya
                </div>
              </div>
              <div className="grow-0 ">
                <button className="w-full text-center bg-[#1D1D1D] text-white text-[16px] font-semibold py-[14px] rounded-lg">
                  Hubungi Penjual
                </button>
              </div>
              <div className="flex md:flex-row flex-col xl:gap-[41px] lg:gap-[31px] md:gap-[21px] gap-[11px] ">
                {productSellerById.user.detail_seller.instagram && (
                  <div className="flex gap-[28px]  items-center">
                    <Image
                      width={0}
                      height={0}
                      alt="instagram"
                      src={instagram}
                      className="max-w-[27px] max-h-[27px] "
                    />
                    <h1>@{productSellerById.user.detail_seller.instagram}</h1>
                  </div>
                )}
                {productSellerById.user.detail_seller.whatsapp && (
                  <div className="flex gap-[28px] items-center">
                    <Image
                      width={0}
                      height={0}
                      alt="whatsapp"
                      src={whatsapp}
                      className="max-w-[27px] max-h-[27px] "
                    />
                    <h1>{productSellerById.user.detail_seller.whatsapp}</h1>
                  </div>
                )}
                {productSellerById.user.detail_seller.facebook && (
                  <div className="flex gap-[28px] items-center">
                    <Image
                      width={0}
                      height={0}
                      alt="facebook"
                      src={facebook}
                      className="max-w-[27px] max-h-[27px] "
                    />
                    <h1>{productSellerById.user.detail_seller.facebook}</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="h-[58px]" />
        <div className="flex gap-[17px] bg-white rounded-[8px]">
          <span className="border-2 rounded-full border-[#4DBB8D]"></span>
          <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
            Produk Lainnya
          </h1>
        </div>
        <div className="h-[24px] md:h-[36px] xl:h-[48px]" />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-5 gap-y-10 md:pl-12 xl:pl-24 pr-4">
          {productSellerDatas &&
            productSellerDatas.map((data, i) => (
              <CardProductV2
                key={i}
                name={data.name}
                thumbnail={data.image_uri}
                price={data.price}
                seller={data.user.name}
                href={`/toko/${decodeURIComponent(detailToko)}/${data.name}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProdukPage;
