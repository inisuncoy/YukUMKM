'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { IoIosSearch } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { FaRegStar, FaStar } from 'react-icons/fa';

import LogoUMKM from '../../../../../public/assets/icon/store.jpeg';
import instagram from '../../../../../public/assets/icon/instagram.png';
import whatsapp from '../../../../../public/assets/icon/whatsapp.png';
import facebook from '../../../../../public/assets/icon/facebook.png';

import { z } from 'zod';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

import NextBreadcrumb from '@/components/NextBreadcrumb';
import CardProductV2 from '@/components/card/CardProductV2';
import Loading from '@/components/Loading';

import request from '@/utils/request';

const formSchema = z.object({
  rating: z.number(),
});

const DetailTokoPage = ({ params }) => {
  const { detailToko } = params;
  const [sallerDatas, setSallerDatas] = useState();
  const [productSallerDatas, setProductSallerDatas] = useState();
  const [idSeller, setIdSeller] = useState();
  const [idReview, setIdReview] = useState();
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [review, setReview] = useState();
  const [modalReview, setModalReview] = useState(false);
  const [isActionReview, setIsActionReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validations, setValidations] = useState([]);
  const [selectedStar, setSelectedStar] = useState(0);
  const [queryItemSeller, setQueryItemSeller] = useState('');

  const [queryItemSellerValue] = useDebounce(queryItemSeller, 500);

  const checkboxRefs = useRef([]);
  const stars = Array(5).fill(0);

  const fetchSaller = useCallback(async () => {
    await request
      .get(`/public/seller?slug=${detailToko}`)
      .then(function (response) {
        setSallerDatas([response.data.data]);
        setIdSeller(response.data.data.id);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [detailToko]);

  const fetchProductSaller = useCallback(async () => {
    const payload = {
      userId: idSeller,
      minPrice: minPrice,
      maxPrice: maxPrice,
      status: true,
      name_insensitive: queryItemSellerValue,
    };

    const queryParams = new URLSearchParams();
    selectedItems.forEach((id) => {
      queryParams.append('itemCategoryIds[]', id);
    });

    await request
      .get(`/public/item?${queryParams.toString()}`, payload)
      .then(function (response) {
        setProductSallerDatas(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [idSeller, selectedItems, minPrice, maxPrice, queryItemSellerValue]);

  const fetchReview = useCallback(async () => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }

    let payload = {
      sellerId: idSeller,
    };

    await request
      .get(`/cms/sellerRating`, payload)
      .then(function (response) {
        if (response.data.data != []) {
          setReview(response.data.data[0].rating);
          setSelectedStar(response.data.data[0].rating);
        } else {
          setReview(0);
          setSelectedStar(0);
        }
        setIdReview(response.data.data[0].id);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [idSeller]);

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

  const onSubmit = async (e, rating) => {
    e.preventDefault();
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');

    const validation = formSchema.safeParse({
      rating: rating,
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

    const requestMethod = review ? request.patch : request.post;

    let data = {
      sellerId: idSeller,
      rating: rating,
    };

    requestMethod(
      review ? `/cms/sellerRating?id=${idReview}` : '/cms/sellerRating',
      review ? { rating: data.rating } : data
    )
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success(
            review ? 'Success Update Review' : 'Success Add Review'
          );
          setIsActionReview(true);
          setModalReview(false);
        }
        setLoading(false);
      })
      .catch(function (error) {
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

  const checkTokenAndPerformAction = (action) => {
    const token = Cookies.get('token');
    if (!token) {
      setShowModal(true);
    } else {
      action();
    }
  };

  useEffect(() => {
    if (queryItemSellerValue) {
      fetchProductSaller();
    }

    if (isActionReview) {
      fetchReview();
      setIsActionReview(false);
    }

    Promise.all([
      fetchCategory(),
      fetchReview(),
      fetchSaller(),
      fetchProductSaller(),
    ]);
  }, [
    fetchCategory,
    fetchReview,
    fetchSaller,
    fetchProductSaller,
    isActionReview,
    queryItemSellerValue,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-[19px]">
        <div className="w-full relative">
          <input
            value={queryItemSeller}
            onChange={(e) => setQueryItemSeller(e.target.value)}
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
              <div className="relative md:w-[281px] md:h-[296px] flex-shrink-0">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                  alt="main-product-img"
                  src={
                    data.profile_uri
                      ? process.env.NEXT_PUBLIC_HOST + data.profile_uri
                      : LogoUMKM
                  }
                  className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                />
              </div>

              <div className="w-full flex flex-col lg:gap-0 gap-5">
                <div className="flex gap-[12px] grow">
                  <div className="relative md:hidden w-[100px] h-[100px] flex-shrink-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      loading="lazy"
                      alt="main-product-img"
                      src={
                        data.profile_uri
                          ? process.env.NEXT_PUBLIC_HOST + data.profile_uri
                          : LogoUMKM
                      }
                      className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                    />
                  </div>
                  <div className="flex flex-col gap-[12px] grow">
                    <div>
                      <div className="flex justify-between">
                        <h1 className="font-semibold text-[30px] md:text-[40px]">
                          {data.name}
                        </h1>
                        <div className="w-full flex justify-end items-center grow-0 text-[14px] gap-1 ">
                          <FaStar className="text-[#FEC810] text-2xl md:text-4xl" />
                          <div className="px-[3px] py-[6px] text-center text-[18px] md:text-[24px]">
                            <h1>{data.avgRating ?? 0}</h1>
                          </div>
                        </div>
                      </div>
                      {data.address && (
                        <div className="flex gap-[9px] items-start">
                          <MdLocationOn className="text-[#E21B1B] text-[20px] md:text-[22px] " />
                          <p className="text-[13px] md:text-[16px] font-bold">
                            {data.address}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-row flex-wrap mt-2  gap-[11px] md:hidden">
                        {data.detail_seller.instagram && (
                          <div className="flex gap-[8px]  items-center">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                              alt="instagram"
                              src={instagram}
                              className="w-[12px] h-[12px] md:w-[27px] md:h-[27px] "
                            />
                            <h1 className="text-[8px]">
                              @{data.detail_seller.instagram}
                            </h1>
                          </div>
                        )}
                        {data.detail_seller.whatsapp && (
                          <div className="flex gap-[8px] items-center">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                              alt="whatsapp"
                              src={whatsapp}
                              className="w-[12px] h-[12px] md:w-[27px] md:h-[27px] "
                            />
                            <h1 className="text-[8px]">
                              {data.detail_seller.whatsapp}
                            </h1>
                          </div>
                        )}
                        {data.detail_seller.facebook && (
                          <div className="flex gap-[8px] items-center">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              loading="lazy"
                              alt="facebook"
                              src={facebook}
                              className="w-[12px] h-[12px] md:w-[27px] md:h-[27px] "
                            />
                            <h1 className="text-[8px]">
                              {data.detail_seller.facebook}
                            </h1>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="hidden md:block text-[13px] ">
                      {data.detail_seller.description}
                    </p>
                  </div>
                </div>
                <p className="md:hidden text-[13px] ">
                  {data.detail_seller.description}
                </p>
                <div className="grow-0 flex">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Cegah navigasi default
                      checkTokenAndPerformAction(() => {
                        localStorage.setItem('partner', JSON.stringify(data));
                        window.location.href = `/chat`;
                      });
                    }}
                    className="w-full text-center bg-[#1D1D1D] text-white text-[12px] md:text-[16px] font-semibold py-2 md:py-[14px] rounded-lg"
                  >
                    Hubungi Penjual
                  </button>

                  <button
                    onClick={() =>
                      checkTokenAndPerformAction(() => setModalReview(true))
                    }
                    className="w-full text-center bg-white border-2 border-black text-black text-[12px] md:text-[16px] font-semibold py-2 md:py-[14px] rounded-lg"
                  >
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
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-4 lg:gap-[8px] md:gap-12 gap-8 px-4 pb-4">
              {productSallerDatas &&
                productSallerDatas.map((data, i) => (
                  <CardProductV2
                    key={i}
                    name={data.name}
                    thumbnail={data.image_uri}
                    price={data.price}
                    seller={data.user.name}
                    href={`${data.user?.slug}/${data.slug}`}
                  />
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
                  <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
                    <div className="max-w-sm mx-auto">
                      <label
                        htmlFor="number-input"
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

                    <div className="max-w-sm mx-auto">
                      <label
                        htmlFor="number-input"
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

      {modalReview && (
        <div
          className={`fixed w-full h-full overflow-y-scroll backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center`}
          onClick={() => {
            setModalReview(!modalReview);
            setSelectedStar(review ?? 0);
          }}
        >
          <div
            className="rounded-lg w-full h-[200px] mx-[10px] md:w-[694px] md:h-[279px] flex flex-col justify-center items-center gap-[14px] bg-white m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[26px]">Beri Penilaian Toko</p>
            <div className="flex gap-[40px]">
              {stars.map((_, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    setSelectedStar(index + 1);
                    onSubmit(e, index + 1);
                  }}
                >
                  {index < selectedStar ? (
                    <FaStar className="text-[30px] md:text-[78px] cursor-pointer text-[#FFF000]" />
                  ) : (
                    <FaRegStar className="text-[30px] md:text-[78px] cursor-pointer " />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">You need to log in</h2>
            <p className="mb-4">Please log in to access the chat.</p>
            <Link href="/login">
              <p className="text-blue-500 underline">Go to Login Page</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailTokoPage;
