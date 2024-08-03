'use client';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import CardProduct from '../card/CardProduct';
import { IoIosArrowForward } from 'react-icons/io';
import CardProductV2 from '../card/CardProductV2';
import Image from 'next/image';
import { NumberFormat } from '@/utils/numberFormat';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SwiperProduk({ datas }) {
  const router = useRouter();
  const iconArrow = (
    <svg
      className="xl:w-[55px] md:w-[40px]"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.9661 10.2082C27.9729 9.20142 29.6053 9.20142 30.6121 10.2082L46.0808 25.677C47.0876 26.6838 47.0876 28.3162 46.0808 29.323L30.6121 44.7918C29.6053 45.7986 27.9729 45.7986 26.9661 44.7918C25.9592 43.7849 25.9592 42.1526 26.9661 41.1457L38.0337 30.0781H10.7422C9.31833 30.0781 8.16406 28.9239 8.16406 27.5C8.16406 26.0761 9.31833 24.9219 10.7422 24.9219H38.0337L26.9661 13.8543C25.9592 12.8474 25.9592 11.2151 26.9661 10.2082Z"
        fill="white"
      />
    </svg>
  );
  if (!Array.isArray(datas)) {
    console.error('The "datas" prop should be an array');
    return null; // or return some fallback UI
  }

  return (
    <div className="w-full relative">
      <div className="w-full md:[mask-image:_linear-gradient(to_right,_black_0%,_black_calc(100%-100px),_transparent_100%)] [mask-image:_linear-gradient(to_right,_black_0%,_black_calc(100%-40px),_transparent_100%)]">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={{
            nextEl: '.next',
          }}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 5.5,
              spaceBetween: 25,
            },
          }}
        >
          {/* {datas &&
            datas.map((data, i) => (
              <SwiperSlide
                key={i}
                className="bg-[#faeced] px-[12px] rounded-lg"
              >
                <CardProduct
                  name={data.name}
                  thumbnail={data.image_uri}
                  price={data.price}
                  saller={data.user.name}
                  href={`${data.user.name}/${data.name}`}
                />
              </SwiperSlide>
            ))} */}
          {datas.map((data, i) => (
            <SwiperSlide key={i} className=" ">
              <CardProductV2
                key={i}
                name={data.name}
                thumbnail={data.image_uri}
                price={data.price}
                seller={data.user.name}
                href={`/toko/${data.user.slug}/${data.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute z-20 right-[-8%] md:right-[-2%] top-1/2 transform -translate-y-1/2 flex items-center justify-center">
        <button className="bg-white rounded-full xl:w-[54px] md:w-[40px] w-[40px] xl:h-[54px] md:h-[40px] h-[40px] flex items-center justify-center shadow-lg next">
          <IoIosArrowForward className="text-[#FE6D00] text-xl xl:text-2xl" />
        </button>
      </div>
    </div>
  );
}
