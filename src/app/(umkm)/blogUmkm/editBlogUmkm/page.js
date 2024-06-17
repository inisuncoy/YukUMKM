'use client';
import DragDropFiles from '@/components/forms/DragDropFile';
import InputField from '@/components/forms/InputField';
import TextareaField from '@/components/forms/TextareaField';
import request from '@/utils/request';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';
import { z } from 'zod';
import success from '../../../../../public/assets/icon/succes.png';
import Image from 'next/image';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(100, { message: 'Name must be at most 100 characters long.' })
    .optional(),
  imageUri: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `The maximum file size that can be uploaded is 2MB`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  content: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long.' })
    .optional(),
});

const EditBlogPage = () => {
  const [title, setTitle] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [imageBlogUrl, setImageBlogUrl] = useState();
  const [content, setContent] = useState();

  const [alertDelete, setAlertDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const inputRef = useRef();

  const onDelete = async (e, id) => {
    setLoading(true);
    toast.loading('Deleting data...');
    e.preventDefault();

    request.delete(`/cms/blog?id=${id}`).then(function (response) {
      if (response.data?.code === 200 || response.data?.code === 201) {
        toast.dismiss();
        toast.success(response.data.data.message);
        setAlertDelete(!alertDelete);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          router.push('/blogUmkm'); // Redirect to the desired page
        }, 2000); // 2 seconds delay
      }
      setLoading(false);
    });
  };

  const fetchBlogById = useCallback(async () => {
    request
      .get(`/cms/blog?id=${id}`)
      .then(function (response) {
        setTitle(response.data.data.title);
        setImageBlogUrl(response.data.data.image_uri);
        setContent(response.data.data.content);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchBlogById();
  }, [fetchBlogById]);

  const onSubmit = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    // Inisialisasi objek data dengan title dan content
    let data = {
      title: title,
      content: content,
    };

    // Tambahkan imageUri ke data jika imageUri tidak null atau undefined
    if (imageUri != null) {
      data.imageUri = imageUri;
    }

    // Buat validasi hanya jika imageUri tidak null atau undefined
    if (imageUri != null) {
      const validation = formSchema.safeParse(data);

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
    }

    // Lakukan request patch hanya jika validasi berhasil atau jika tidak ada imageUri
    request
      .patch(`/cms/blog?id=${id}`, data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success('Success Update Blog');
          router.push('/blogUmkm');
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

  const handleDrop = (event) => {
    event.preventDefault();
    setImageUri(event.dataTransfer.files[0]);
  };

  return (
    <>
      {showSuccess && (
        <div
          className={`fixed w-full h-full overflow-y-scroll backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center`}
        >
          <div className="rounded-lg w-[694px] h-[279px] flex flex-col justify-center items-center gap-[14px] bg-white m-auto">
            <Image
              width={0}
              height={0}
              alt="icon"
              src={success} // Replace with your success image path
              className="w-[195px]"
            />
            <h1 className="font-semibold text-black text-[26px] text-center rounded-lg">
              Blog <span className="text-[#4DBB8D]">berhasil</span> dihapus
            </h1>
          </div>
        </div>
      )}
      <div className="relative flex flex-col gap-[30px]">
        <div className="px-[23px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
          <span className="border-2 rounded-full border-[#FE6D00]"></span>
          <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
            Pembuatan Blog
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="relative w-full bg-white rounded-lg shadow-lg px-[27px] py-[39px] flex flex-col gap-[24px]">
            <InputField
              id={'title'}
              name={'title'}
              value={title}
              label={'Nama Artikel'}
              placeholder={'Nama Artikel'}
              type={'text'}
              onChange={(e) => setTitle(e.target.value)}
              required
              validations={validations}
            />
            <DragDropFiles
              id={'imageUri'}
              name={'imageUri'}
              value={imageUri}
              imgDefault={imageBlogUrl}
              label={'Gambar Blog'}
              handleDrop={handleDrop}
              handleDeleteImg={() => setImageUri(null)}
              // handleClickInput={() => inputRef.current.click()}
              ref={inputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const img = e.target.files[0];
                  setImageUri(img);
                }
              }}
              validations={validations}
            />
            <TextareaField
              id={'content'}
              name={'content'}
              value={content}
              label={'Deskripsi Blog'}
              placeholder={'Tulis disini ...'}
              onChange={(e) => setContent(e.target.value)}
              validations={validations}
            />
            <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg flex items-center justify-center gap-4">
              <MdOutlineAdd className="text-[20px]" />
              <p>Buat Blog</p>
            </button>
            <FaRegTrashAlt
              className="text-red-500 text-2xl absolute top-7 right-6 cursor-pointer"
              onClick={() => setAlertDelete(!alertDelete)}
            />
          </div>
        </form>
        <div
          className={`fixed w-full h-full overflow-y-scroll backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center  ${
            alertDelete ? '' : 'hidden'
          }`}
          onClick={() => {
            setAlertDelete(!alertDelete);
          }}
        >
          <div
            className="rounded-lg w-[694px] h-[279px] flex flex-col justify-center items-center gap-[14px] bg-white m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[26px]">
              Apakah anda yakin ingin
              <br />
              <span className="text-red-500 font-semibold">menghapus</span> blog
              ini?
            </p>
            <button
              onClick={(e) => onDelete(e, id)}
              className="w-[120px] text-[23px] font-semibold text-white bg-red-500 py-2 text-center rounded-lg"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlogPage;
