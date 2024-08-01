/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import Logo from '../../../public/assets/logo/logoUMKM.png';
import iconToko from '../../../public/assets/icon/store.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
const CardTokoV2 = ({ logo, name, href, className }) => {
  return (
    <Link  href={href ? href : "#"} className={`bg-[#faeced] rounded-lg hover:border hover:border-sky-500 ease-linear ${className}`}>
      <div className='aspect-square'>
        <Image
            width={0}
            height={0}
            sizes='100vw'
            loading='lazy'
            alt="product"
            src={(logo) ? (process.env.NEXT_PUBLIC_HOST + logo) : "/assets/logo/logoUMKM.png"}
            className="w-full h-full object-cover rounded-lg pt-2 px-2"
          />
      </div>
      <div className="flex flex-col mt-[24px] gap-[12px] justify-center  items-center grow ">
         <div className="flex items-center gap-[10px] text-[14px] font-medium grow h-full">
           <Image
             width={0}
             height={0}
             alt="product"
             src={iconToko}
             className="w-[12px] h-[12px] object-cover"
           />
           <p className='group-hover:text-blue-500 duration-200'>{name}</p>
         </div>
         <div className="w-full flex justify-end items-center grow-0 text-[14px] gap-1">
           <FaStar className="text-[#FEC810]" />
           <div className="px-[3px] py-[6px] border-[1.5px] border-black rounded-br-lg">
             <h1>4.1</h1>
           </div>
         </div>
       </div>
    </Link>
    // <Link href={href} className="bg-[#faeced] rounded-lg">
    //   {logo ? (
    //     <img
    //       width={0}
    //       height={0}
    //       alt="product"
    //       src={process.env.NEXT_PUBLIC_HOST + logo}
    //       className=" xl:w-[145px] xl:h-[145px] lg:w-[145px] lg:h-[145px] md:w-[145px] md:h-[145px] w-[115px] h-[115px]  object-cover  m-auto mt-[10px]"
    //     />
    //     />
    //   ) : (
    //     <Image
    //       width={0}
    //       height={0}
    //       alt="product"
    //       src={iconToko}
    //       className=" xl:w-[145px] xl:h-[145px] lg:w-[145px] lg:h-[145px] md:w-[145px] md:h-[145px] w-[115px] h-[115px]  object-cover  m-auto mt-[10px]"
    //     />
    //   )}

    //   <div className="flex flex-col mt-[24px] gap-[12px] justify-center  items-center grow">
    //     <div className="flex items-center gap-[7px] text-[14px] font-medium grow h-full">
    //       <Image
    //         width={0}
    //         height={0}
    //         alt="product"
    //         src={iconToko}
    //         className="w-[12px] h-[12px] object-cover"
    //       />
    //       <p>{name}</p>
    //     </div>
    //     <div className="w-full flex justify-end items-center grow-0 text-[14px] gap-1">
    //       <FaStar className="text-[#FEC810]" />
    //       <div className="px-[3px] py-[6px] border-2 border-black rounded-br-lg">
    //         <h1>4.1</h1>
    //       </div>
    //     </div>
    //   </div>
    // </Link>

  );
};

export default CardTokoV2;
