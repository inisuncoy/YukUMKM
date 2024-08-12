/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
const CardTokoV2 = ({ logo, name, href, className, avgRating }) => {
  return (
    <Link href={href ? href : '#'}>
      <div
        className={`bg-primary rounded-lg hover:border hover:border-sky-500 ease-linear ${className}`}
      >
        <div className={`relative w-full h-full flex-shrink-0 aspect-square`}>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            alt="product"
            src={
              logo
                ? process.env.NEXT_PUBLIC_HOST + logo
                : '/assets/icon/store.jpeg'
            }
            className="absolute left-0 top-0 w-full h-full object-cover rounded-lg pt-2 px-2 object-center transition duration-50"
          />
        </div>
        <div className="flex flex-col mt-[24px] gap-[12px] justify-center  items-center grow ">
          <div className="flex items-center gap-[10px] text-[14px] font-medium grow h-full">
            <Image
              width={0}
              height={0}
              alt="product"
              loading="lazy"
              sizes="100vw"
              src={'/assets/icon/icon-toko.png'}
              className="w-[12px] h-[12px] object-cover"
            />
            <p className="group-hover:text-blue-500 duration-200">{name}</p>
          </div>
          <div className="w-full flex justify-end items-center grow-0 text-[14px] gap-1 ">
            <FaStar className="text-[#FEC810]" />
            <div className="px-[3px] py-[6px] border-[1.5px] border-gray-400 rounded-br-lg w-[29px] text-center">
              <h1>{avgRating ?? 0}</h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardTokoV2;
