'use client';
import CardProductV2 from '@/components/card/CardProductV2';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

//   useEffect(() => {
//     const redirect = async () => {
//       router.push('/beranda');
//     };

//     redirect();
//   }, [router]);

//   return null;
  return (
    <div className='flex gap-2'>
      <CardProductV2/>
      <CardProductV2/>
      <CardProductV2/>
      <CardProductV2/>
    </div>
  )
}
