'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Mengarahkan pengguna dari / ke /login
  }, [router]); // Komponen ini hanya dijalankan sekali setelah mounting

  return null; // Atau tampilkan pesan atau komponen lain jika perlu
}
