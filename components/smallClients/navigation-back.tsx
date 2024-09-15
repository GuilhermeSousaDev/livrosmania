/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';
import { FaChevronCircleLeft } from '@react-icons/all-files/fa/FaChevronCircleLeft';
import { useRouter } from 'next/navigation';

export default function NavigationBack() {
  const router = useRouter();

  return (
    <div onClick={() => router.back()}>
      <FaChevronCircleLeft className="cursor-pointer" size={20} />
    </div>
  );
}
