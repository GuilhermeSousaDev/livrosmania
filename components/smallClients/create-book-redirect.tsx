'use client';
import { Button } from '@nextui-org/button';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bounce, toast } from 'react-toastify';

import { createBook } from '@/app/services/book';

export default function CreateBookRedirect() {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => () => router.refresh(), []);

  const createBookAndRedirect = async () => {
    setIsLoading(true);

    if (!session?.user?.email) return;

    const { ok, book } = await createBook({
      title: 'Sem título',
      description: 'Sem descrição',
      user_email: session?.user?.email,
    });

    if (!ok) {
      setIsLoading(false);

      return toast(
        <div className="flex items-center">Erro ao criar livro</div>,
        {
          type: 'error',
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        },
      );
    }

    return router.push(`/create/${book._id}`);
  };

  return (
    <Button isIconOnly isLoading={isLoading} onClick={createBookAndRedirect}>
      <FaPlusCircle className="cursor-pointer" size={20} />
    </Button>
  );
}
