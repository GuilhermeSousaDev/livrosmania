import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { getUserBooks } from '@/app/services/user';
import AvatarClient from '@/components/smallClients/avatar-client';
import BooksCarousel from '@/components/books-carousel';
import { subtitle } from '@/components/primitives';
import DeleteUserAccount from '@/components/smallClients/delete-user-account';

export default async function Profile() {
  const session = await getServerSession();

  if (!session?.user?.email) return redirect('/');

  const { user, userBooks } = await getUserBooks(session?.user.email);

  return (
    <section className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <AvatarClient
          className="w-24 h-24 rounded-full border-2 border-gray-300"
          src={user?.image ?? ''}
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.name || 'Nome do Usuário'}
          </h1>
          <p className="text-gray-600">{user?.email || 'Email do Usuário'}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Informações Adicionais
        </h2>
        <p className={(subtitle(), 'text-gray-600')}>Seus livros</p>

        <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-md">
          <BooksCarousel books={userBooks} />
        </div>
      </div>

      <DeleteUserAccount userEmail={user.email} />
    </section>
  );
}
