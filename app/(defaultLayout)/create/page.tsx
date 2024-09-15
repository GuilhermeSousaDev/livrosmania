import { Input } from '@nextui-org/input';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import CreateBookRedirect from '../../../components/smallClients/create-book-redirect';

import { SearchIcon } from '@/components/icons';
import { UserBookCard } from '@/components/user-book-card';
import { authOptions } from '@/config/auth';
import { findUserBooks } from '@/app/services/book';

export default async function Create() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return redirect('/');

  const books = await findUserBooks(session?.user?.email);

  return (
    <section className="flex flex-col justify-center gap-4 py-4 md:py-6">
      <div className="flex items-center gap-4">
        <Input
          classNames={{
            base: 'w-full h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Procure um de seus livros..."
          size="sm"
          startContent={<SearchIcon size={20} />}
          type="search"
        />

        <CreateBookRedirect />
      </div>

      <div className="flex gap-5 flex-wrap">
        {books.map((book) => (
          <div key={book._id} className="flex-1 basis-full">
            <UserBookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}
