/* eslint-disable @next/next/no-img-element */
import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import Image from 'next/image';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment';

const CardBlogLarge = ({ imageUri, title, href, saller, date }) => {
  return (
    <Link href={href}>
      <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div className="relative w-full h-[233px] flex-shrink-0">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            alt="main-product-img"
            src={process.env.NEXT_PUBLIC_HOST + imageUri}
            className="absolute left-0 top-0 w-full h-full object-cover object-center rounded-t-lg transition duration-50"
          />
        </div>

        <div className="lg:p-[16px] md:p-[12px] p-[8px] flex flex-col justify-between space-y-3">
          <h5 className="mb-[3px] md:text-[16px] text-[12px] font-semibold tracking-tight text-gray-900  ">
            {title}
          </h5>

          <div className="text-[10px] flex lg:flex-row md:flex-col gap-1 text-gray-400 lg:items-center ">
            <p className="md:block hidden">
              <span>{saller} </span>
            </p>
            <GoDotFill className="lg:block hidden" />
            <span>{moment(date).format('DD/MM/YYYY, LT')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBlogLarge;
