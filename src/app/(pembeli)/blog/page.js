/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import { IoIosSearch } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';

import hero from '../../../../public/assets/img/hero/image.png';
import Link from 'next/link';
import CardBlogLarge from '@/components/card/CardBlogLarge';
import CardBlogSmall from '@/components/card/CardBlogSmall';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import request from '@/utils/request';
import moment from 'moment';

export default function BlogPAge() {
  const [blogDatas, setBlogDatas] = useState();
  const [recordsTotal, setRecordsTotal] = useState();
  const [loading, setLoading] = useState(true);

  const fetchBlog = useCallback(async () => {
    await request
      .get(`/public/blog`)
      .then(function (response) {
        setBlogDatas(response.data.data);
        setRecordsTotal(response.data.recordsTotal);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);
  return (
    <div className=" w-full">
      <div className="w-full h-[390px] inline-flex flex-nowrap overflow-hidden ">
        <Image
          width={0}
          height={0}
          alt="hero"
          src={hero}
          className="w-full object-cover object-bottom lg:rounded-lg"
        />
      </div>

      <div className="mt-[20px] flex flex-col gap-[30px]">
        <div className="w-full relative">
          <input
            className=" w-full py-[20px] pl-[53px] rounded-[8px]"
            placeholder="Search here..."
          />
          <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
            <IoIosSearch className="text-[24px] text-black " />
          </button>
        </div>
        <NextBreadcrumb
          separator={
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          }
          capitalizeLinks
        />
        <div className=" w-full bg-white rounded-lg relative px-[22px] pb-5">
          <div className=" py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Blog
            </h1>
          </div>
          <div className=" flex flex-col gap-[30px]">
            {recordsTotal >= 1 && (
              <Link
                href={`blog/${blogDatas[0].title}`}
                className="rounded-lg shadow-xl flex lg:flex-row flex-col gap-[20px] lg:pr-[23px]"
              >
                <img
                  width={0}
                  height={0}
                  alt="main-blog"
                  src={process.env.NEXT_PUBLIC_HOST + blogDatas[0].image_uri}
                  className="lg:max-w-[413px] max-h-[323px] lg:w-[413px] md:w-full lg:h-[323px]  object-cover lg:rounded-l-lg md:rounded-lg"
                />
                <div className="flex flex-col gap-[14px] justify-center lg:px-0 md:p-[12px] p-[12px]">
                  <div>
                    <h1 className="font-semibold text-[16px]">
                      {blogDatas[0].title}
                    </h1>
                    <div className="text-[10px] flex gap-1 text-gray-400 items-center ">
                      <p className="md:block hidden">
                        <span>{blogDatas[0].user.name} </span>
                      </p>
                      <GoDotFill className="lg:block hidden" />
                      <span>
                        {moment(blogDatas[0].created_at).format(
                          'DD/MM/YYYY, LT'
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="xl:text-[13px] lg:text-[11px] md:text-[12px] ">
                    {blogDatas[0].content.length > 1000
                      ? `${blogDatas[0].content.substring(0, 1000)}...`
                      : blogDatas[0].content}
                  </p>
                </div>
              </Link>
            )}
            <div className="flex lg:gap-[33px] md:gap-[23px] gap-[13px] ">
              {recordsTotal >= 3 &&
                blogDatas &&
                blogDatas
                  .slice(1, 3)
                  .map((data, i) => (
                    <CardBlogLarge
                      key={i}
                      imageUri={data.image_uri}
                      title={data.title}
                      href={`blog/${data.title}`}
                      saller={data.user.name}
                      date={data.created_at}
                    />
                  ))}
            </div>
            <div className="flex flex-col gap-[30px]">
              {recordsTotal >= 4 &&
                blogDatas &&
                blogDatas
                  .slice(3, 99)
                  .map((data, i) => (
                    <CardBlogSmall
                      key={i}
                      name={data.user.name}
                      src={data.image_uri}
                      title={data.title}
                      date={data.created_at}
                      content={data.content}
                      href={`blog/${data.title}`}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
