/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment';
import { NumberFormat } from '@/utils/numberFormat';

const CardProductSmall = ({
  href = '#',
  src,
  seller = 'Anunamaki',
  titleProduct = 'Beras Kencur',
  price = 100000,
}) => {
  return (
    <Link href={href ?? '#'} className="w-full h-full  ">
      <div className=" p-[10px] flex gap-3 bg-white border border-gray-200  hover:bg-gray-100  overflow-hidden items-center justify-start">
        <div className="relative w-[50px] h-[50px] aspect-square flex-shrink-0">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            alt="main-product-img"
            src={
              src
                ? process.env.NEXT_PUBLIC_HOST + src
                : '/assets/logo/logoUMKM.png'
            }
            className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
          />
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div>
            <h1 className="font-semibold xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px]">
              {titleProduct}
            </h1>
            <div className="text-[12px] flex gap-1 text-gray-400 items-center ">
              <p className="md:block hidden">
                <span>{seller} </span>
              </p>
              <GoDotFill className="lg:block hidden" />
              <span>{NumberFormat(price)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProductSmall;
