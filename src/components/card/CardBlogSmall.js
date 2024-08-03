/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment';

const CardBlogSmall = ({ src, name, title, date, content, href }) => {
  return (
    <Link href={href} className="w-full h-full ">
      <div className="flex gap-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  overflow-hidden items-center justify-start">
        <div className="relative lg:w-[301px] lg:h-[144px] md:w-[200px] md:h-[200px] w-[120px] h-[120px] flex-shrink-0">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            alt="main-product-img"
            src={process.env.NEXT_PUBLIC_HOST + src}
            className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
          />
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div>
            <h1 className="font-semibold xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px]">
              {title}
            </h1>
            <div className="text-[12px] flex gap-1 text-gray-400 items-center ">
              <p className="md:block hidden">
                <span>{name} </span>
              </p>
              <GoDotFill className="lg:block hidden" />
              <span>{moment(date).format('DD/MM/YYYY, LT')}</span>
            </div>
          </div>
          <p className="xl:text-[15px] lg:text-[13px] md:text-[12px] text-[10px] ">
            {content.length > 250 ? `${content.substring(0, 250)}...` : content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardBlogSmall;
