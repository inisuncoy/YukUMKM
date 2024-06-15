import TextareaField from '@/components/forms/TextareaField';
import React from 'react';

const TambahBlogPage = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="px-[23px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
        <span className="border-2 rounded-full border-[#FE6D00]"></span>
        <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
          Produk
        </h1>
      </div>
      <div className="w-full bg-white rounded-lg shadow-lg px-[27px] py-[39px]">
        <TextareaField
          id={'description'}
          name={'description'}
          // value={description}
          label={'Deskripsi'}
          placeholder={'Deskripsi produk'}
          // onChange={(e) => setDescription(e.target.value)}
          required
          // validations={validations}
        />
      </div>
    </div>
  );
};

export default TambahBlogPage;
