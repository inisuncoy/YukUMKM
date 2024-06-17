/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment';

const CardBlogSmall = ({ src, title, date, content, href }) => {
  return (
    <Link
      href={href}
      className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow   hover:bg-gray-100 "
    >
      <img
        width={0}
        height={0}
        alt=""
        src={'http://localhost:3000' + src}
        className=" lg:max-w-[301px] lg:max-h-[144px]  md:w-[200px] md:h-[200px] w-[120px] h-[120px] object-cover  rounded-t-lg md:rounded-none md:rounded-s-lg"
      />
      <div className="flex flex-col justify-between lg:pl-[25px] md:pl-[20px] pl-[12px] md:pr-[12px] md:gap-[14px] gap-[4px] leading-normal">
        <div>
          <h1 className="font-semibold xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px]">
            {title}
          </h1>
          <div className="text-[12px] flex gap-1 text-gray-400 items-center ">
            <p className="md:block hidden">
              <span>Syakirun Niam, </span>
              <span>Syakirun Niam, </span>
            </p>
            <GoDotFill className="lg:block hidden" />
            <span>{moment(date).format('DD/MM/YYYY, LT')}</span>
          </div>
        </div>
        <p className="xl:text-[15px] lg:text-[13px] md:text-[12px] text-[10px] ">
          {content.length > 250 ? `${content.substring(0, 250)}...` : content}
        </p>
      </div>
    </Link>
  );
};

export default CardBlogSmall;
