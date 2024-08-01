'use client';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import CardTokoV2 from '@/components/card/CardTokoV2';
import request from '@/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const TokoPage = () => {
  const [sallerDatas, setSallerDatas] = useState();
  const [loading, setLoading] = useState(true);

  const fetchSaller = useCallback(async () => {
    await request
      .get(`/public/seller`)
      .then(function (response) {
        setSallerDatas(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchSaller();
  }, [fetchSaller]);

  return (
    <div className="flex flex-col gap-[19px]">
      <div className="w-full relative ">
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
      <div className=" w-full bg-white rounded-lg relative px-[22px] pb-5 pt-[33px]">
        <div className="xl:px-[50px] lg:px-[40px] md:px-[30px] px-[20px]  py-[18px] flex gap-[17px] bg-white rounded-[8px]">
          <span className="border-2 rounded-full border-[#FE6D00]"></span>
          <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
            Toko
          </h1>
        </div>
        <div className="xl:px-[60px] lg:px[50px] md:px-[40px] px-[30px] grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-[16px] gap-y-[30px]">
          {loading ? (
            <div>Loading</div>
          ) : (
            sallerDatas &&
            sallerDatas.map((data, i) => (
              <CardTokoV2
                key={i}
                href={`/toko/${data.slug}`}
                logo={data.profile_uri}
                name={data.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TokoPage;
