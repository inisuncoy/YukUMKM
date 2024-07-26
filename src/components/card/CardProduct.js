/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import product1 from '../../../public/assets/img/product/product1.png';
import iconToko from '../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NumberFormat } from '@/utils/numberFormat';

const CardProduct = ({ name, thumbnail, price, saller, href }) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      className="bg-[#faeced] px-3 py-2 xl:w-[164px] lg:w-[154px] md:[164px] w-[154px] max-w-[164px] max-h-[230px] rounded-lg"
    >
      <img
        width={0}
        height={0}
        alt="product"
        src={process.env.NEXT_PUBLIC_HOST + thumbnail}
        className=" xl:w-[145px] xl:h-[145px] lg:w-[135px] lg:h-[135px] md:w-[145px] md:h-[145px] w-[135px] h-[135px]  object-cover m-auto"
      />
      <div className="flex flex-col gap-[25px] mt-[3px]">
        <div className="text-[10px] grow">
          <h1>{name}</h1>
          <h2 className="font-black">{NumberFormat(price)}</h2>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            router.push(`/toko/${saller}`);
          }}
          className="flex items-center gap-[7px] text-[10px]"
        >
          <Image
            width={0}
            height={0}
            alt="product"
            src={iconToko}
            className="w-[12px] h-[12px] object-cover"
          />
          <p>{saller}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
