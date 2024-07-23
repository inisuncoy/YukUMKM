/* eslint-disable @next/next/no-img-element */
import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import Image from 'next/image';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment';

const CardBlogLarge = ({ imageUri, title, href, saller, date }) => {
  return (
    <Link
      href={href}
      className=" bg-white border border-gray-200 rounded-lg shadow "
    >
      <img
        width={0}
        height={0}
        alt=""
        src={process.env.NEXT_PUBLIC_HOST + imageUri}
        className="w-full h-fullrounded-t-lg"
      />
      <div className="lg:p-[16px] md:p-[12px] p-[8px]">
        <a href="#">
          <h5 className="mb-[3px] md:text-[16px] text-[12px] font-semibold tracking-tight text-gray-900 ">
            {title}
          </h5>
        </a>
        <div className="text-[10px] flex lg:flex-row md:flex-col gap-1 text-gray-400 lg:items-center ">
          <p className="md:block hidden">
            <span>{saller} </span>
          </p>
          <GoDotFill className="lg:block hidden" />
          <span>{moment(date).format('DD/MM/YYYY, LT')}</span>
        </div>
      </div>
    </Link>
  );
};

export default CardBlogLarge;
