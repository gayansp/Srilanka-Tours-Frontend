"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/admin/AHeader';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      router.replace('/login');
    } else if (role !== "admin") {
      router.replace('/unauthorized');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 font-sans">Verifying administration permissions...</p>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-gray-100'>
      <Header />
      <div className='pt-16 h-[calc(100vh-69px)] overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}
