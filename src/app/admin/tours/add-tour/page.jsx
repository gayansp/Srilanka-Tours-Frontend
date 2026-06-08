"use client";

import AddTours from '../../../../views/admin/AddTours';
import { useRouter } from 'next/navigation';

export default function AdminAddToursPage() {
  const router = useRouter();
  return <AddTours onClose={() => router.push('/admin/tours')} />;
}
