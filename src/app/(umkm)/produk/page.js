/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import { IoIosSearch } from 'react-icons/io';
import request from '@/utils/request';
import InputField from '@/components/forms/InputField';
import TextareaField from '@/components/forms/TextareaField';
import SelectionField from '@/components/forms/SelectionField';
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';

const ORDERING = 'updatedAt';
const SORT = 'desc';
const LIMIT = 10;

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 3 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long.' }),
  // category: z
  //   .string()
  //   .min(1, { message: 'Category must be at least 3 characters long' })
  //   .max(100, { message: 'Category must be at most 30 characters long.' }),
  // status: z.boolean({
  //   required_error: 'Status is required',
  // }),
  // price: z.number().int({ message: 'Price must be a number' }),
  // imagesUri: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `The maximum file size that can be uploaded is 2MB`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 3 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long.' }),
});

const ProdukPage = () => {
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [status, setStatus] = useState();
  const [price, setPrice] = useState();
  const [itemImages, setItemImages] = useState([]);
  const [description, setDescription] = useState();
  const [imageUri, setImageUri] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailUri, setThumbnailUri] = useState();

  const [menuActive, setMenuActive] = useState(false);
  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ?? '';

  const page = searchParams.get('page') ?? '1';

  const [productDatas, setProductDatas] = useState([]);
  const [productDataById, setProductDataById] = useState();
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const [recordsTotal, setRecordsTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceValue] = useDebounce(searchQuery, 500);

  const [images, setImages] = useState([]);
  const [imgLength, setImgLength] = useState(5);

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...images];
      newImages[index] = files[0];
      setImages(newImages);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    document.getElementById(`img${index}`).value = '';
  };

  const icon = (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 72.3684V69.8778H1.31579V72.3684C1.31579 73.0951 1.90489 73.6842 2.63158 73.6842H5.12217V75H2.63158C1.1782 75 0 73.8218 0 72.3684ZM10.1034 75V73.6842H15.0846V75H10.1034ZM20.0658 75V73.6842H25.047V75H20.0658ZM30.0282 75V73.6842H35.0094V75H30.0282ZM39.9906 75V73.6842H44.9718V75H39.9906ZM49.953 75V73.6842H54.9342V75H49.953ZM59.9154 75V73.6842H64.8966V75H59.9154ZM69.8778 75V73.6842H72.3684C73.0951 73.6842 73.6842 73.0951 73.6842 72.3684V69.8778H75V72.3684C75 73.8218 73.8218 75 72.3684 75H69.8778ZM75 64.8966H73.6842V59.9154H75V64.8966ZM75 54.9342H73.6842V49.953H75V54.9342ZM75 44.9718H73.6842V39.9906H75V44.9718ZM75 35.0094H73.6842V30.0282H75V35.0094ZM75 25.047H73.6842V20.0658H75V25.047ZM75 15.0846H73.6842V10.1034H75V15.0846ZM75 5.12218H73.6842V2.63158C73.6842 1.90489 73.0951 1.31579 72.3684 1.31579H69.8778V0H72.3684C73.8218 0 75 1.1782 75 2.63158V5.12218ZM64.8966 0V1.31579H59.9154V0H64.8966ZM54.9342 0V1.31579H49.953V0H54.9342ZM44.9718 0V1.31579H39.9906V0H44.9718ZM35.0094 0V1.31579H30.0282V0H35.0094ZM25.047 0V1.31579H20.0658V0H25.047ZM15.0846 0V1.31579H10.1034V0H15.0846ZM5.12218 0V1.31579H2.63158C1.90489 1.31579 1.31579 1.90489 1.31579 2.63158V5.12217H0V2.63158C0 1.1782 1.1782 0 2.63158 0H5.12218ZM0 10.1034H1.31579V15.0846H0V10.1034ZM0 20.0658H1.31579V25.047H0V20.0658ZM0 30.0282H1.31579V35.0094H0V30.0282ZM0 39.9906H1.31579V44.9718H0V39.9906ZM0 49.953H1.31579V54.9342H0V49.953ZM0 59.9154H1.31579V64.8966H0V59.9154ZM20.2632 15.5263H54.7368C56.9169 15.5263 58.6842 17.2936 58.6842 19.4737V45.3703C62.6361 46.5106 65.5263 50.1546 65.5263 54.4737C65.5263 59.7059 61.2848 63.9474 56.0526 63.9474C52.0268 63.9474 48.5874 61.4362 47.2155 57.8947H20.2632C18.0831 57.8947 16.3158 56.1274 16.3158 53.9474V19.4737C16.3158 17.2936 18.0831 15.5263 20.2632 15.5263ZM56.0526 39.7845V45C50.8205 45 46.5789 49.2415 46.5789 54.4737C46.5789 54.7395 46.5899 55.0028 46.6114 55.2632H41.9485C41.9347 55.2444 41.9204 55.2257 41.9054 55.2073L38.4141 50.8997L51.7162 34.4083L56.0526 39.7845ZM20.2632 18.1579C19.5365 18.1579 18.9474 18.747 18.9474 19.4737V45.4188L25.4374 37.4114C25.964 36.7617 26.9552 36.7617 27.4818 37.4114L36.423 48.4431L50.692 30.7529C51.2187 30.0999 52.2137 30.0999 52.7403 30.7529L56.0526 34.8593V19.4737C56.0526 18.747 55.4635 18.1579 54.7368 18.1579H20.2632ZM18.9474 53.9474V50.3296L26.4596 41.061L37.9705 55.2632H20.2632C19.5365 55.2632 18.9474 54.6741 18.9474 53.9474ZM35 30.7895C36.4534 30.7895 37.6316 29.6113 37.6316 28.1579C37.6316 26.7045 36.4534 25.5263 35 25.5263C33.5466 25.5263 32.3684 26.7045 32.3684 28.1579C32.3684 29.6113 33.5466 30.7895 35 30.7895ZM35 33.4211C37.9068 33.4211 40.2632 31.0647 40.2632 28.1579C40.2632 25.2511 37.9068 22.8947 35 22.8947C32.0932 22.8947 29.7368 25.2511 29.7368 28.1579C29.7368 31.0647 32.0932 33.4211 35 33.4211ZM56.0526 61.3158C59.8314 61.3158 62.8947 58.2525 62.8947 54.4737C62.8947 50.6949 59.8314 47.6316 56.0526 47.6316C52.2738 47.6316 49.2105 50.6949 49.2105 54.4737C49.2105 58.2525 52.2738 61.3158 56.0526 61.3158ZM55.5263 51.5789V53.9474H53.1579V55.2632H55.5263V57.6316H56.8421V55.2632H59.2105V53.9474H56.8421V51.5789H55.5263Z"
        fill="black"
        fill-opacity="0.25"
      />
    </svg>
  );
  const dataStatus = [
    { name: 'Tersedia', value: true },
    { name: 'Tidak Tersedia', value: false },
  ];

  const onDelete = async (e, id) => {
    setLoading(true);
    toast.loading('Deleting data...');
    e.preventDefault();

    request.delete(`/cms/item?id=${id}`).then(function (response) {
      if (response.data?.code === 200 || response.data?.code === 201) {
        toast.dismiss();
        toast.success(response.data.data.message);
        setIsProductAdded(true);
      }
      setLoading(false);
    });
  };

  const onDeleteImg = async (e, id) => {
    setLoading(true);
    toast.loading('Deleting data...');
    e.preventDefault();

    request.delete(`/cms/itemImage?id=${id}`).then(function (response) {
      if (response.data?.code === 200 || response.data?.code === 201) {
        toast.dismiss();
        toast.success(response.data.data.message);
        setIsProductAdded(true);
      }
      setLoading(false);
    });
  };

  const onSubmit = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    const validation = formSchema.safeParse({
      name: name,
      price: price,
      description: description,
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

    let data = new FormData();
    data.append('name', name);
    data.append('itemCategory', category);
    data.append('price', price);
    data.append('description', description);
    data.append('status', status);
    data.append('imageUri', thumbnail);

    let dataItemImages = new FormData();
    images.forEach((img) => {
      if (img != null) {
        dataItemImages.append('imagesUri[]', img);
      }
    });

    request
      .post('/cms/item', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        if (images.length !== 0) {
          dataItemImages.append('itemId', response.data.data.id);
          request.post('/cms/itemImage', dataItemImages, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        toast.dismiss();
        toast.success('Success Add Product');
        setIsProductAdded(true);
        setMenuActive(!menuActive);
        setImages([]);
        setImgLength(5);
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
          setImages([]);
          setThumbnail('');
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

  const onUpdate = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    let data = new FormData();
    data.append('name', name);
    data.append('itemCategory', category);
    data.append('price', price);
    data.append('description', description);
    data.append('status', status);

    if (thumbnail != '') {
      data.append('imageUri', thumbnail);
    }

    let dataItemImages = new FormData();
    images.forEach((img) => {
      if (img != null) {
        dataItemImages.append('imagesUri[]', img);
      }
    });

    // Buat validasi hanya jika imageUri tidak null atau undefined
    // if (thumbnail != null) {
    const validation = formSchema.safeParse({
      name: name,
      price: price,
      description: description,
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
    // }

    request
      .patch(`/cms/item?id=${id}`, data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          if (images != null) {
            dataItemImages.append('itemId', id);
            request
              .post('/cms/itemImage', dataItemImages, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(function (response) {
                toast.dismiss();
                toast.success('Success Update Product');
                setIsProductAdded(true);
                setMenuActive(!menuActive);
                setImages([]);
                setThumbnail('');
                setImgLength(5);
              });
          }
          toast.dismiss();
          toast.success('Success Update Product');
          setIsProductAdded(true);
          setMenuActive(!menuActive);
          setImages([]);
          setThumbnail('');
          setImgLength(5);
          // }
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
          setImageUri('');
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

  const fetchProductsById = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get(`/cms/item?id=${id}`);
      setProductDataById(response.data.data);
      setName(response.data.data.name);
      setCategory(response.data.data.item_category_id);
      setStatus(response.data.data.is_active);
      setPrice(response.data.data.price);
      setDescription(response.data.data.description);
      setItemImages(response.data.data.item_image);
      setThumbnailUri(response.data.data.image_uri);
      setImgLength(1);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id]);
  // useEffect(() => {
  //   fetchProductsById();
  // }, [fetchProductsById]);

  useEffect(() => {
    if (id !== '') {
      fetchProductsById();
    } else if (id === '') {
      setName('');
      setCategory('');
      setStatus('');
      setPrice();
      setDescription('');
      setImages([]);
      setItemImages([]);
      setImgLength(5);
    }
  }, [id, fetchProductsById]);

  const fetchProducts = useCallback(async () => {
    const payload = {
      name_insensitive: debounceValue,
    };
    request
      .get(`/cms/item`, payload)
      .then(function (response) {
        setProductDatas(response.data.data);
        setRecordsTotal(response.data.recordsTotal);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [debounceValue]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (debounceValue !== '') {
      router.push('/produk');
    } else {
      fetchProducts();
    }
  }, [debounceValue, fetchProducts, router]);

  useEffect(() => {
    if (isProductAdded) {
      fetchProducts();
      fetchProductsById();
      setIsProductAdded(false);
      setItemImages([]);
      setImages([]);
      // setCategory('');
    }
  }, [isProductAdded, fetchProducts, fetchProductsById]);

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

  const optionCategory = categoryDatas.map((category) => ({
    name: category.name,
    value: category.id,
  }));

  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <div className="w-full relative">
          <input
            id={'search'}
            name={'search'}
            placeholder={'Search for product'}
            type={'text'}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className=" w-full py-[20px] pl-[53px] rounded-[8px]"
          />
          <button className="absolute z-50 top-0 left-0 bottom-0 m-auto ml-[15px] ">
            <IoIosSearch className="text-[24px] text-black " />
          </button>
        </div>

        <div className="w-full bg-white rounded-lg p-[54px] flex flex-col gap-[28px] ">
          <div className="flex justify-between items-center">
            <div className=" py-[18px] flex gap-[17px] bg-white rounded-[8px]">
              <span className="border-2 rounded-full border-[#FE6D00]"></span>
              <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                Produk
              </h1>
            </div>
            <Link
              href={'/produk'}
              onClick={() => setMenuActive(!menuActive)}
              className="flex justify-center items-center gap-[19px] text-[#2D76E5] text-[16px] pl-[15px] pr-[21px] py-3 shadow-lg rounded-lg "
            >
              <FaPlus />
              {/* <h1>{id ? 'Update Produk' : 'Tambah Produk'}</h1> */}
              <h1>Tambah Produk</h1>
            </Link>
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right  ">
                <thead className="text-xs text-gray-700 uppercase bg-white  border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama Produk
                    </th>
                    <th scope="col" className="px-6 py-3">
                      price
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {productDatas &&
                    productDatas.map((data, index) => (
                      <tr key={index} className="bg-white  ">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex  items-center gap-[12px]">
                            <img
                              width={78}
                              height={78}
                              alt="product"
                              src={
                                process.env.NEXT_PUBLIC_HOST + data.image_uri
                              }
                            />
                            <h1>{data.name}</h1>
                          </div>
                        </td>
                        <td className="px-6 py-4">Rp {data.price}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-[12px]">
                            <button
                              onClick={(e) => onDelete(e, data.id)}
                              className="w-[72px] py-[14px] bg-[#FF0000] text-white text-center text-[12px] font-bold rounded-lg"
                            >
                              Hapus
                            </button>
                            <Link
                              href={`/produk?id=${data.id}`}
                              onClick={() => setMenuActive(!menuActive)}
                              className="w-[72px] py-[14px] bg-[#6366F1] text-white text-center text-[12px] font-bold rounded-lg"
                            >
                              Ubah
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setMenuActive(!menuActive);
          setName('');
          setCategory('');
          setStatus('');
          setPrice('');
          setDescription('');
          setImgLength(5);
          setImages([]);
          setItemImages([]);
          setThumbnail('');
          setThumbnailUri('');
        }}
        className={`fixed w-full h-full overflow-y-scroll backdrop-blur-sm bg-black/20  top-0 left-0 z-[70] flex justify-center  ${
          menuActive ? '' : 'hidden'
        }`}
      >
        <div
          className="w-[694px] flex flex-col justify-center  gap-[14px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" w-full bg-white rounded-lg relative">
            <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
              <span className="border-2 rounded-full border-[#FE6D00]"></span>
              <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                Profile
              </h1>
            </div>
          </div>
          <form onSubmit={id ? onUpdate : onSubmit}>
            <div
              className="w-full bg-white rounded-lg relative p-[20px] flex flex-col gap-[43px] overflow-auto"
              style={{ maxHeight: '80vh' }}
            >
              <div className="grid grid-cols-1 gap-[32px]">
                <InputField
                  id={'name'}
                  name={'name'}
                  value={name}
                  label={'Nama Produk'}
                  placeholder={'Nama Produk'}
                  type={'text'}
                  onChange={(e) => setName(e.target.value)}
                  required
                  validations={validations}
                />
                <SelectionField
                  id={'itemCategory'}
                  name={'itemCategory'}
                  value={category}
                  label={'Kategori'}
                  options={optionCategory}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  validations={validations}
                />
                <SelectionField
                  id={'status'}
                  name={'status'}
                  value={status}
                  label={'Status'}
                  options={dataStatus}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  validations={validations}
                />
                <InputField
                  id={'price'}
                  name={'price'}
                  value={price}
                  label={'Harga Satuan'}
                  placeholder={'Harga satuan'}
                  type={'number'}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  validations={validations}
                />
                <div className="flex flex-col gap-5 items-start">
                  <div className="flex-[0.7] flex flex-col gap-5">
                    <h1 className="text-[16px] font-bold leading-tight text-gray-500">
                      Thumbnail Produk<span className="text-[#FE6D00]">*</span>
                    </h1>
                    <div className="flex gap-[15px] flex-wrap">
                      {thumbnailUri ? (
                        <div className="relative">
                          <div>
                            <img
                              width={0}
                              height={0}
                              src={
                                thumbnail
                                  ? URL.createObjectURL(thumbnail)
                                  : process.env.NEXT_PUBLIC_HOST + thumbnailUri
                              }
                              className="rounded-lg w-[75px] h-[75px] object-cover"
                              alt={`thumbnail-img`}
                            />
                            {thumbnail ? (
                              <GiCancel
                                className="absolute -top-0 -right-0 text-red-500 cursor-pointer bg-white rounded-full"
                                onClick={() => {
                                  {
                                    setThumbnail('');
                                    document.getElementById(
                                      `thumbnail_img`
                                    ).value = '';
                                  }
                                }}
                              />
                            ) : (
                              <label
                                className="absolute -top-0 -right-0 text-red-500 cursor-pointer bg-white rounded-full border-[1px] border-red-500 text-xl p-1"
                                htmlFor="thumbnail_img"
                              >
                                <FiEdit3 className=" text-red-500 text-[12px]" />
                              </label>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          {thumbnail ? (
                            <>
                              <Image
                                width={0}
                                height={0}
                                loading="lazy"
                                sizes="100vw"
                                src={URL.createObjectURL(thumbnail)}
                                className="rounded-lg w-[75px] h-[75px] object-cover"
                                alt={`thumbnail-img`}
                              />
                              <GiCancel
                                className="absolute -top-0 -right-0 text-red-500 cursor-pointer bg-white rounded-full"
                                onClick={() => {
                                  setThumbnail('');
                                  document.getElementById(
                                    `thumbnail_img`
                                  ).value = '';
                                }}
                              />
                            </>
                          ) : (
                            <label
                              htmlFor={`thumbnail_img`}
                              className="cursor-pointer"
                            >
                              {icon}
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                    <input
                      id={`thumbnail_img`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const img = e.target.files[0];
                          setThumbnail(img);
                        }
                      }}
                    />
                  </div>
                  <div className="flex-[2] flex flex-col gap-5">
                    <h1 className="text-[16px] font-bold leading-tight text-gray-500">
                      Gambar Produk<span className="text-[#FE6D00]">*</span>
                    </h1>
                    <div className="flex gap-[15px] flex-wrap">
                      {itemImages &&
                        itemImages.map((data, i) => (
                          <div key={i} className="relative">
                            <>
                              <img
                                width={0}
                                height={0}
                                src={process.env.NEXT_PUBLIC_HOST + data.uri}
                                className="rounded-lg w-[75px] h-[75px] object-cover"
                                alt={`product-img-${i}`}
                              />
                              <GiCancel
                                className="absolute -top-0 -right-0 text-red-500 cursor-pointer bg-white rounded-full"
                                onClick={(e) => onDeleteImg(e, data.id)}
                              />
                            </>
                          </div>
                        ))}
                      {[...Array(imgLength ?? 5)].map((_, i) => (
                        <div key={i} className="relative">
                          {images[i] ? (
                            <>
                              <Image
                                width={0}
                                height={0}
                                src={URL.createObjectURL(images[i])}
                                className="rounded-lg w-[75px] h-[75px] object-cover"
                                alt={`product-img-${i}`}
                              />
                              <GiCancel
                                className="absolute -top-0 -right-0 text-red-500 cursor-pointer bg-white rounded-full"
                                onClick={() => handleRemoveImage(i)}
                              />
                            </>
                          ) : (
                            <label
                              htmlFor={`img${i}`}
                              className="cursor-pointer"
                            >
                              {icon}
                            </label>
                          )}
                          <input
                            id={`img${i}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, i)}
                          />
                        </div>
                      ))}
                      <div className="flex justify-center items-center h-[75px]">
                        <MdAddCircleOutline
                          className="text-2xl cursor-pointer"
                          onClick={() => setImgLength(imgLength + 1)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* {images.forEach((img) => {
                  if (img != null) {
                    <div>{URL.createObjectURL(img)}</div>;
                  }
                })} */}
                {/* <input
                  id={`img`}
                  type="file"
                  accept="image/*"
                  className=""
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const img = e.target.files[0];
                      setImageUri(img);
                    }
                  }}
                /> */}
                <TextareaField
                  id={'description'}
                  name={'description'}
                  value={description}
                  label={'Deskripsi'}
                  placeholder={'Deskripsi produk'}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  validations={validations}
                />
              </div>
              <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg">
                {id ? 'Update' : 'Konfirmasi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProdukPage;
