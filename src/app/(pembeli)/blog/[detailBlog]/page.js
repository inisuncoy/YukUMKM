/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { LuUser2 } from 'react-icons/lu';

import moment from 'moment';
import Cookies from 'js-cookie';
import { z } from 'zod';
import toast from 'react-hot-toast';

import NextBreadcrumb from '@/components/NextBreadcrumb';

import request from '@/utils/request';

const formSchema = z.object({
  comment: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(190, { message: 'Title must be at most 190 characters long.' }),
});

const DetailBlogPage = ({ params }) => {
  const { detailBlog } = params;
  const [blogDatas, setBlogDatas] = useState([]);
  const [idBlogData, setIdBlog] = useState();
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState();

  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isLogin, setIsLogin] = useState(false);

  let token = Cookies.get('token');

  const onSubmit = async (e) => {
    e.preventDefault();
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');

    const validation = formSchema.safeParse({
      comment: comment,
    });

    if (!validation.success) {
      validation.error.errors.map((validation) => {
        const key = [
          {
            name: validation.path[0],
            message: validation.message,
          },
        ];
        setValidations((validations) => [...validations, ...key]);
      });
      setLoading(false);
      toast.dismiss();
      toast.error('Invalid Input.');

      return;
    }
    let data = {
      blogId: idBlogData,
      comment: comment,
    };

    request
      .post('/cms/comment', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success('Success Add Comment');
        }
        setLoading(false);
        setComment('');
        setAddComment(true);
      })
      .catch(function (error) {
        console.log(error);
        if (
          (error.response?.data?.code === 400 ||
            error.response?.data?.code === 422) &&
          error.response?.data.status == 'VALIDATION_ERROR'
        ) {
          setValidations(error.response?.data.error?.validation);
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
        setLoading(false);
      });
  };

  const fetchBlog = useCallback(async () => {
    let payload = {
      slug: detailBlog,
    };
    await request
      .get(`/public/blog`, payload)
      .then(function (response) {
        setBlogDatas([response.data.data]);
        setIdBlog(response.data.data.id);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [detailBlog]);

  useEffect(() => {
    if (addComment) {
      fetchBlog();
    }
    if (token) {
      setIsLogin(true);
    }
    setAddComment(false);

    Promise.all([fetchBlog()]);
  }, [fetchBlog, addComment, token]);

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
              <div className="relative w-full h-[389px]  flex-shrink-0">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                  alt="main-product-img"
                  src={process.env.NEXT_PUBLIC_HOST + data.image_uri}
                  className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                />
              </div>
              <p className="xl:text-[20px]">{data.content}</p>
            </div>
            <div className="h-[65px]"></div>
            <div className="flex flex-col gap-3 ">
              {data.comments &&
                data.comments.map((comment, i) => (
                  <div key={i} className="flex gap-[32px]">
                    {comment.user.profile_uri ? (
                      <div className="relative w-[51px] h-[51px] border-[2px] border-black flex justify-center items-end rounded-full  flex-shrink-0">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          loading="lazy"
                          alt="main-product-img"
                          src={
                            process.env.NEXT_PUBLIC_HOST +
                            comment.user.profile_uri
                          }
                          className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                        />
                      </div>
                    ) : (
                      <div className="w-[51px] h-[51px] border-[2px] border-black flex justify-center items-end">
                        <LuUser2 className="text-[45px] " />
                      </div>
                    )}
                    <div className="w-full border-[1px] border-black px-[20px] pt-[11px] pb-[30px]">
                      <div className="flex flex-col md:flex-row md:items-center md:gap-[20px]">
                        <h1 className="text-[20px] font-semibold ">
                          {comment.user.name}
                        </h1>
                        <span className="text-[15px] font-medium opacity-50 ">
                          {moment(comment.created_at).format('DD/MM/YYYY, LT')}
                        </span>
                      </div>
                      <div className="h-[24px]"></div>
                      <div className="w-full">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="h-[96px]"></div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-[29px]">
                <h1 className="text-[16px] font-semibold">
                  TINGGALKAN KOMENTAR ANDA
                </h1>
                <div className="border border-black rounded-lg">
                  <textarea
                    id="comment"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-t-lg  border-b border-t-0 border-x-0 border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    onChange={(e) => setComment(e.target.value)}
                    validations={validations}
                    value={comment}
                  ></textarea>
                  {isLogin ? (
                    ''
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
                        type="summit"
                      >
                        Kirim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ))}
    </div>
  );
};

export default DetailBlogPage;
