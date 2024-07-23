/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';

import LogoUMKM from '../../../../../public/assets/icon/store.jpeg';
import CardProduct from '@/components/card/CardProduct';
import NextBreadcrumb from '@/components/NextBreadcrumb';
//import { usePathname } from 'next/navigation';
import request from '@/utils/request';
import InputField from '@/components/forms/InputField';

//export async function generateStaticParams() {
//  return [{ detailToko: 'Sayur Mayur' }];
//}

const DetailTokoPage = ({ params }) => {
  const { detailToko } = params;
  const [sallerDatas, setSallerDatas] = useState();
  const [productSallerDatas, setProductSallerDatas] = useState();
  const [idSeller, setIdSeller] = useState();
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const checkboxRefs = useRef([]);

  const handleCheckboxChange = (event, data) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, data.id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== data.id));
    }
  };

  const handleReset = () => {
    setSelectedItems([]);
    checkboxRefs.current.forEach((checkbox) => {
      if (checkbox) checkbox.checked = false;
    });
  };

  const fetchSaller = useCallback(async () => {
    await request
      .get(`/public/seller?name_sensitive=${decodeURIComponent(detailToko)}`)
      .then(function (response) {
        setSallerDatas(response.data.data);
        setIdSeller(response.data.data[0].id);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [detailToko]);

  useEffect(() => {
    fetchSaller();
  }, [fetchSaller]);

  const fetchProductSaller = useCallback(async () => {
    const payload = {
      userId: idSeller,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    // Construct query string for itemCategoryIds
    const queryParams = new URLSearchParams();
    selectedItems.forEach((id) => {
      queryParams.append('itemCategoryIds[]', id);
    });

    const url = `/public/item?${queryParams.toString()}`;

    await request
      .get(`/public/item?${queryParams.toString()}`, payload)
      .then(function (response) {
        setProductSallerDatas(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [idSeller, selectedItems, minPrice, maxPrice]);

  useEffect(() => {
    fetchProductSaller();
  }, [fetchProductSaller]);

  const fetchCategory = useCallback(async () => {
    await request
      .get(`/public/itemCategory`)
      .then(function (response) {
        setCategoryDatas(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <div className="flex flex-col gap-[19px]">
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
      {sallerDatas &&
        sallerDatas.map((data, i) => (
          <div
            key={i}
            className="w-full p-[17px] bg-white rounded-lg flex md:flex-row flex-col  gap-[16px]"
          >
            {data.profile_uri ? (
              <img
                width={0}
                height={0}
                alt="profile-toko"
                src={process.env.NEXT_PUBLIC_HOST + data.profile_uri}
                className="md:w-[281px] md:h-[296px] object-cover rounded-lg"
              />
            ) : (
              <Image
                width={0}
                height={0}
                alt="profile-toko"
                src={LogoUMKM}
                className="md:w-[281px] md:h-[296px] object-cover rounded-lg"
              />
            )}
            <div className="w-full flex flex-col lg:gap-0 gap-5">
              <div className="flex flex-col gap-[12px] grow">
                <div>
                  <h1 className="font-semibold text-[40px]">{data.name}</h1>
                  <div className="flex gap-[9px] items-center">
                    <MdLocationOn className="text-[#E21B1B] text-[22px]" />
                    <p className="text-[16px] font-bold">{data.address}</p>
                  </div>
                </div>
                <p className="text-[13px] ">{data.detail_seller.description}</p>
              </div>
              <div className="grow-0 flex">
                <button className="w-full text-center bg-[#1D1D1D] text-white text-[16px] font-semibold py-[14px] rounded-lg">
                  Hubungi Penjual
                </button>
                <button className="w-full text-center bg-white border-2 border-black text-black text-[16px] font-semibold py-[14px] rounded-lg">
                  Beri Penilaian
                </button>
              </div>
            </div>
          </div>
        ))}

      <div className="xl:pl-[148px] lg:pl-[258px] md:pl-[] lg:pr-[20px] w-full lg:bg-white rounded-lg relative flex flex-col-reverse gap-5">
        <div className="bg-white rounded-lg">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Produk
            </h1>
          </div>
          <div className="h-[15px]" />
          <div className="grid  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-[16px] lg:gap-[8px] md:gap-12 gap-8  px-4 pb-4">
            {productSallerDatas &&
              productSallerDatas.map((data, i) => (
                <div
                  key={i}
                  className="m-auto bg-[#faeced] w-full flex justify-center rounded-lg"
                >
                  <CardProduct
                    name={data.name}
                    thumbnail={data.image_uri}
                    price={data.price}
                    saller={data.user.name}
                    href={`${decodeURIComponent(detailToko)}/${data.name}`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="lg:w-[280px] lg:h-[520px] bg-white lg:shadow-2xl lg:absolute lg:top-0 xl:-left-[134px] lg:-left-[24px] rounded-lg lg:pb-0 md:pb-5">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#4DBB8D]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Filter
            </h1>
          </div>
          <div className="flex lg:flex-col flex-row  lg:gap-[8px] ">
            <fieldset className="w-full">
              <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Kategori
              </legend>

              <div className="space-y-2 px-5 py-6">
                {categoryDatas.map((data, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      ref={(el) => (checkboxRefs.current[i] = el)}
                      id={`checkbox-${i}`}
                      type="checkbox"
                      name={`type[${data.name}]`}
                      className="h-5 w-5 rounded border-gray-300"
                      onChange={(event) => handleCheckboxChange(event, data)}
                    />
                    <label
                      htmlFor={`checkbox-${i}`}
                      className="ml-3 text-sm font-medium"
                    >
                      {data.name}
                    </label>
                  </div>
                ))}
                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                    onClick={handleReset}
                  >
                    Reset Type
                  </button>
                </div>
              </div>
            </fieldset>
            <fieldset className="w-full">
              <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Harga
              </legend>

              <div className="space-y-2 px-5 py-6">
                <div className="flex gap-5 items-center">
                  <div className="max-w-sm mx-auto">
                    <label
                      for="number-input"
                      className="block w-full pb-2 text-xs font-medium"
                    >
                      MIN
                    </label>
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <h1 className="block text-xs font-medium">To</h1>
                  <div className="max-w-sm mx-auto">
                    <label
                      for="number-input"
                      className="block w-full pb-2 text-xs font-medium"
                    >
                      Max
                    </label>
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                    onClick={() => {
                      setMinPrice(''), setMaxPrice('');
                    }}
                  >
                    Reset Type
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTokoPage;
