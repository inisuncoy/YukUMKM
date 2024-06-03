'use client';
import React from 'react';
import product1 from '../../../public/assets/uploads/product/product1.png';
import iconToko from '../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CardProduct = () => {
  const router = useRouter();
  return (
    <Link
      href={'/toko/Inod’s Crafthouse/Keranjang kayu'}
      className="bg-[#faeced] px-3 py-2 xl:w-[164px] lg:w-[154px] md:[164px] w-[154px] max-w-[164px] max-h-[230px] rounded-lg"
    >
      <Image
        width={0}
        height={0}
        alt="product"
        src={product1}
        className=" xl:w-[145px] xl:h-[145px] lg:w-[135px] lg:h-[135px] md:w-[145px] md:h-[145px] w-[135px] h-[135px]  object-cover m-auto"
      />
      <div className="flex flex-col gap-[25px] mt-[3px]">
        <div className="text-[10px] grow">
          <h1>Keranjang Kayu</h1>
          <h2 className="font-black">Rp.200.000,00</h2>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            router.push('/toko/detailToko');
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
          <p>Inod’s Crafthouse</p>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
