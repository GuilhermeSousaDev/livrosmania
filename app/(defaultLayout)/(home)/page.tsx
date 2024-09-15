import { AxiosError } from 'axios';

import MainCard from '@/components/main-card';
import { findBooks } from '@/app/services/book';
import BookSection from '@/components/book-section';

export default async function Home() {
  const books = await findBooks();

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <MainCard />

      <BookSection
        books={books instanceof AxiosError ? [] : books}
        title="Recém publicados"
      />
    </section>
  );
}
