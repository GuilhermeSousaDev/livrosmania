'use client';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { Bounce, toast, TypeOptions } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { desactiveUser } from '@/app/services/user';

interface DeleteUserAccountProps {
  userEmail: string;
}

export default function DeleteUserAccount({
  userEmail,
}: DeleteUserAccountProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRemoveUserAccount = async () => {
    setLoading(true);

    try {
      await desactiveUser(userEmail);

      showToast('Usuário desativado com sucesso', 'success');

      signOut();

      router.push('/');
    } catch (e) {
      showToast('Erro ao remover usuário, tente mais tarde', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Button
        className="px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        isLoading={loading}
        onClick={handleRemoveUserAccount}
      >
        Excluir Conta
      </Button>
    </div>
  );
}

function showToast(message: string, type: TypeOptions = 'default') {
  toast(<div className="flex items-center">{message}</div>, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
    type,
  });
}
