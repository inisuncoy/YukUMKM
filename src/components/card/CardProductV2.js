/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import product1 from '../../../public/assets/img/product/product1.png';
import iconToko from '../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NumberFormat } from '@/utils/numberFormat';

const CardProductV2 = ({
  name,
  thumbnail,
  price,
  seller,
  href,
  className,
  sizeImg,
  slug,
}) => {
  const router = useRouter();
  return (
    <Link href={href ? href : '#'}>
      <div
        className={`bg-primary relative  duration-200 ease-linear p-3 pb-12 rounded-[5px] space-y-3 ${className} `}
      >
        <div
          className={`relative ${
            sizeImg ? sizeImg : 'w-[100%] h-[100%]'
          }  flex-shrink-0 aspect-square bg-white`}
        >
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            alt="product"
            src={
              thumbnail
                ? process.env.NEXT_PUBLIC_HOST + thumbnail
                : '/assets/icon/icon-toko.png'
            }
            className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
          />
        </div>
        <div className="text-[10px] h-[50px]">
          <h1 className="truncate !font-normal text-wrap line-clamp-2">
            {name}
          </h1>
          <h2 className="font-black">{NumberFormat(price)}</h2>
        </div>
        <div
          className="flex items-center gap-2 text-[10px] absolute bottom-2 left-3"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/toko/${slug}`);
          }}
        >
          <Image
            width={0}
            height={0}
            sizes="100vw"
            alt="product"
            loading="lazy"
            src={iconToko}
            className="w-[12px] h-[12px] object-cover"
          />
          <p>{seller}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardProductV2;
