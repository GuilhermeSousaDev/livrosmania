import MainCard from '@/components/main-card';
import BooksCarousel from '@/components/books-carousel';
import { subtitle } from '@/components/primitives';
import { findBooks } from '@/app/services/book';
import { BookDocument } from '@/app/api/models/Book';

export default async function Home() {
  const books = await findBooks();

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <MainCard />

      <div className="flex flex-col gap-10">
        {/* <BookSection books={books} title="Vistos recente" /> */}
        {/* <BookSection books={books} title="Em alta" /> */}
        <BookSection books={books} title="Recem publicados" />
      </div>
    </section>
  );
}

interface BookSectionProps {
  books: BookDocument[];
  title: string;
}

function BookSection({ books, title }: BookSectionProps) {
  return (
    <div className="flex flex-col gap-2 bg-neutral-950 p-3 rounded-md">
      <span className={subtitle()}>{title}</span>

      <BooksCarousel books={books} />
    </div>
  );
}
