import Image from 'next/image';
import React from 'react';

import { IoIosSearch } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';

import hero from '../../../../public/assets/img/hero/image.png';
import Link from 'next/link';
import CardBlogLarge from '@/components/card/CardBlogLarge';
import CardBlogSmall from '@/components/card/CardBlogSmall';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import { MdOutlineAdd } from 'react-icons/md';
export default function BlogUmkmPage() {
  return (
    <div className=" w-full flex flex-col gap-[30px]">
      <div className="w-full h-[390px] inline-flex flex-nowrap overflow-hidden ">
        <Image
          width={0}
          height={0}
          alt="hero"
          src={hero}
          className="w-full object-cover object-bottom lg:rounded-lg"
        />
      </div>

      <div className=" flex flex-col gap-[30px]">
        <Link
          href={'/blogUmkm/tambahBlog'}
          className="bg-[#4D50FF] w-full py-[20px] text-center text-white rounded-[8px] flex items-center justify-center gap-4"
          placeholder="Search here..."
        >
          <MdOutlineAdd className="text-[20px]" />
          <p>Tambah Blog</p>
        </Link>

        <div className=" w-full bg-white rounded-lg relative px-[22px] pb-5">
          <div className=" py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Blog
            </h1>
          </div>
          <div className=" flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[30px]">
              <CardBlogSmall />
              <CardBlogSmall />
              <CardBlogSmall />
              <CardBlogSmall />
              <CardBlogSmall />
              <CardBlogSmall />
              <CardBlogSmall />
              <CardBlogSmall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
