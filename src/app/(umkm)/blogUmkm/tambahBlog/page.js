'use client';
import DragDropFiles from '@/components/forms/DragDropFile';
import InputField from '@/components/forms/InputField';
import TextareaField from '@/components/forms/TextareaField';
import request from '@/utils/request';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineAdd } from 'react-icons/md';
import { z } from 'zod';

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
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(30, { message: 'Title must be at most 30 characters long.' }),
  imageUri: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `The maximum file size that can be uploaded is 2MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  content: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long.' }),
});

const TambahBlogPage = () => {
  const [title, setTitle] = useState();
  const [imageUri, setImageUri] = useState();
  const [content, setContent] = useState();

  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const inputRef = useRef();

  const onSubmit = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    const validation = formSchema.safeParse({
      title: title,
      imageUri: imageUri,
      content: content,
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
      title: title,
      imageUri: imageUri,
      content: content,
    };

    request
      .post('/cms/blog', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success('Success Add Blog');
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
    <div className="flex flex-col gap-[30px]">
      <div className="px-[23px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
        <span className="border-2 rounded-full border-[#FE6D00]"></span>
        <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
          Pembuatan Blog
        </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="w-full bg-white rounded-lg shadow-lg px-[27px] py-[39px] flex flex-col gap-[24px]">
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
            required
            validations={validations}
          />
          <TextareaField
            id={'content'}
            name={'content'}
            value={content}
            label={'Deskripsi Blog'}
            placeholder={'Tulis disini ...'}
            onChange={(e) => setContent(e.target.value)}
            required
            validations={validations}
          />
          <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg flex items-center justify-center gap-4">
            <MdOutlineAdd className="text-[20px]" />
            <p>Buat Blog</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahBlogPage;
