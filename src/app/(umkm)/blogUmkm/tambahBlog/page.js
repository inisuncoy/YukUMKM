import DragDropFiles from '@/components/forms/DragDropFile';
import InputField from '@/components/forms/InputField';
import TextareaField from '@/components/forms/TextareaField';
import React from 'react';
import { MdOutlineAdd } from 'react-icons/md';

const TambahBlogPage = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="px-[23px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
        <span className="border-2 rounded-full border-[#FE6D00]"></span>
        <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
          Pembuatan Blog
        </h1>
      </div>
      <div className="w-full bg-white rounded-lg shadow-lg px-[27px] py-[39px] flex flex-col gap-[24px]">
        <InputField
          id={'description'}
          name={'description'}
          // value={description}
          label={'Nama Artikel'}
          placeholder={'Nama Artikel'}
          // onChange={(e) => setDescription(e.target.value)}
          required
          // validations={validations}
        />
        <DragDropFiles />
        <TextareaField
          id={'description'}
          name={'description'}
          // value={description}
          label={'Deskripsi Blog'}
          placeholder={'Tulis disini ...'}
          // onChange={(e) => setDescription(e.target.value)}
          required
          // validations={validations}
        />
        <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg flex items-center justify-center gap-4">
          <MdOutlineAdd className="text-[20px]" />
          <p>Buat Blog</p>
        </button>
      </div>
    </div>
  );
};

export default TambahBlogPage;
