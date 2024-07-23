/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import request from '@/utils/request';
import moment from 'moment';
import Cookies from 'js-cookie';

const DetailBlog = ({ params }) => {
  const [blogDatas, setBlogDatas] = useState();
  const [idBlogDatas, setIdBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  let token = Cookies.get('token');

  const fetchBlog = useCallback(async () => {
    let payload = {
      title_sensitive: decodeURIComponent(params),
    };
    await request
      .get(`/public/blog`, payload)
      .then(function (response) {
        setBlogDatas(response.data.data);
        setIdBlog(response.data.data[0].id);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchBlog();
    if (token) {
      setIsLogin(true);
    }
  }, [fetchBlog, token]);
  return (
    <div className="flex flex-col gap-[30px]">
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
      <div className=" py-[18px] px-[16px] flex gap-[17px] bg-white rounded-[8px]">
        <span className="border-2 rounded-full border-[#FE6D00]"></span>
        <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
          Blog
        </h1>
      </div>
      {blogDatas &&
        blogDatas.map((data, i) => (
          <div key={i} className=" p-[32px]  bg-white rounded-[8px]">
            <h1 className="md:text-[40px] text-[26px] font-semibold items-center flex gap-5">
              {data.title}
            </h1>
            <div className="text-[15px] font-medium flex flex-col  gap-1 text-gray-400  ">
              <p className="text-[15px] font-medium">
                1{moment(data.created_at).format('DD/MM/YYYY, LT')}
              </p>
              <p className="text-[20px] font-medium">
                Ditulis oleh {data.user.name}
              </p>
            </div>
            <div className="h-[35px]"></div>
            <div className="flex flex-col gap-[30px]">
              <img
                width={0}
                height={0}
                alt="thumnail"
                src={process.env.NEXT_PUBLIC_HOST + data.image_uri}
                className="w-full"
              />
              <p className="xl:text-[20px]">{data.content}</p>
            </div>
            <div className="h-[96px]"></div>
            <div className="flex flex-col gap-[29px]">
              <h1 className="text-[16px] font-semibold">
                TINGGALKAN KOMENTAR ANDA
              </h1>
              <div className="border border-black rounded-lg">
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 rounded-t-lg  border-b border-t-0 border-x-0 border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                {isLogin ? (
                  <></>
                ) : (
                  <div className="flex flex-col gap-[42px] px-[30px] py-[20px] border-b border-black">
                    <h1 className="text-[20px] ">
                      Masuk terlebih dahulu menggunakan email untuk dapat
                      meninggalkan komentar.
                    </h1>
                    <div>
                      <button className="px-[42px] py-[14px] bg-black text-white rounded-lg ">
                        Masuk
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-[42px] px-[30px] py-[20px] ">
                  <div>
                    <button
                      className={`px-[32px] py-[11px] bg-white border  rounded-lg ${
                        isLogin
                          ? 'border-black text-black'
                          : 'cursor-not-allowed border-gray-300 text-gray-300'
                      } `}
                      disabled={!isLogin}
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DetailBlog;
