import React from 'react';
import Logo from '../../../public/assets/uploads/toko/logoUMKM.png';
import iconToko from '../../../public/assets/icon/icon-toko.png';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
const CardToko = () => {
  return (
    <Link href={'/toko/Inod’s Crafthouse'} className="bg-[#faeced] rounded-lg">
      <Image
        width={0}
        height={0}
        alt="product"
        src={Logo}
        className=" xl:w-[145px] xl:h-[145px] lg:w-[145px] lg:h-[145px] md:w-[145px] md:h-[145px] w-[115px] h-[115px]  object-cover  m-auto mt-[10px]"
      />
      <div className="flex flex-col mt-[24px] gap-[12px] justify-center  items-center grow">
        <div className="flex items-center gap-[7px] text-[14px] font-medium grow h-full">
          <Image
            width={0}
            height={0}
            alt="product"
            src={iconToko}
            className="w-[12px] h-[12px] object-cover"
          />
          <p>Inod’s Crafthouse</p>
        </div>
        <div className="w-full flex justify-end items-center grow-0 text-[14px] gap-1">
          <FaStar className="text-[#FEC810]" />
          <div className="px-[3px] py-[6px] border-2 border-black rounded-br-lg">
            <h1>4.1</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardToko;
