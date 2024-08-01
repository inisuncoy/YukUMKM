/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import product1 from '../../../public/assets/img/product/product1.png';
import iconToko from '../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NumberFormat } from '@/utils/numberFormat';

const CardProductV2 = ({ name, thumbnail, price, seller, href, className }) => {
  const router = useRouter();
  return (
    <Link href={href ? href : "#"} className={`bg-primary relative hover:border-2 hover:border-sky-500 hover:rounded-lg duration-200 ease-linear p-3 pb-12 rounded-[5px] space-y-3 ${className}`}>
      <div className='aspect-square'>
        <Image
            width={0}
            height={0}
            sizes='100vw'
            loading='lazy'
            alt="product"
            src={(thumbnail) ? (process.env.NEXT_PUBLIC_HOST + thumbnail) : "/assets/img/product/product1.png"}
            className="w-full h-full object-cover rounded-[5px]"
          />
      </div>
      <div className="text-[10px] max-w-[164px]">
        <h1 className='truncate !font-normal text-wrap line-clamp-2'>{name}</h1>
        <h2 className="font-black">{NumberFormat(price)}</h2>
      </div>
      <div 
        className='flex items-center gap-2 text-[10px] absolute bottom-2 left-3'
        onClick={(e) => {
          e.preventDefault();
          router.push(`/toko/${seller}`);
        }}>
        <Image
          width={0}
          height={0}
          sizes='100vw'
          alt="product"
          loading='lazy'
          src={iconToko}
          className="w-[12px] h-[12px] object-cover"
        />
        <p>{seller}</p>
      </div>
    </Link>
  );
};

export default CardProductV2;
