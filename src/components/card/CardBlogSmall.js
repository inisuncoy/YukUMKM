/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import blog from '../../../public/assets/img/blog/blog1.png';
import { GoDotFill } from 'react-icons/go';
import moment from 'moment';

const CardBlogSmall = ({ src, name, title, date, content, href }) => {
  return (
    // <Link
    //   href={href}
    //   className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow   hover:bg-gray-100 "
    // >
    //   <div className="lg:w-[301px] lg:h-[144px] md:w-[200px] md:h-[200px] w-[120px] h-[120px] relative">
    //     <img
    //       width={0}
    //       height={0}
    //       alt=""
    //       src={process.env.NEXT_PUBLIC_HOST + src}
    //       className=" absolute top-0 left-0 w-full h-full object-cover  rounded-t-lg md:rounded-none md:rounded-s-lg"
    //       // className=" lg:max-w-[301px] lg:max-h-[144px]  md:w-[200px] md:h-[200px] w-[120px] h-[120px] object-cover  rounded-t-lg md:rounded-none md:rounded-s-lg"
    //     />
    //   </div>
    //   <div className="flex flex-col justify-between lg:pl-[25px] md:pl-[20px] pl-[12px] md:pr-[12px] md:gap-[14px] gap-[4px] leading-normal">
    //     <div>
    //       <h1 className="font-semibold xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px]">
    //         {title}
    //       </h1>
    //       <div className="text-[12px] flex gap-1 text-gray-400 items-center ">
    //         <p className="md:block hidden">
    //           <span>{name} </span>
    //         </p>
    //         <GoDotFill className="lg:block hidden" />
    //         <span>{moment(date).format('DD/MM/YYYY, LT')}</span>
    //       </div>
    //     </div>
    //     <p className="xl:text-[15px] lg:text-[13px] md:text-[12px] text-[10px] ">
    //       {content.length > 250 ? `${content.substring(0, 250)}...` : content}
    //     </p>
    //   </div>
    // </Link>
    <Link href={href} class="w-full h-full ">
      <div class="flex gap-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  overflow-hidden items-center justify-start">
        <div class="relative lg:w-[301px] lg:h-[144px] md:w-[200px] md:h-[200px] w-[120px] h-[120px] flex-shrink-0">
          <img
            alt=""
            class="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
            loading="lazy"
            src={process.env.NEXT_PUBLIC_HOST + src}
          />
        </div>

        <div class="flex flex-col gap-2 py-2">
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
