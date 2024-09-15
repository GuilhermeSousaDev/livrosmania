import { showBook } from '@/app/services/book';
import BookCover from '@/components/smallClients/book-cover';
import { ButtonClient } from '@/components/smallClients/button-client';
import BookInfo from '@/components/smallClients/book-info';

interface BookDetailsParams {
  params: {
    bookId: string;
  };
}

export default async function BookDetails({ params }: BookDetailsParams) {
  const { bookId } = params;

  const book = await showBook(bookId);

  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-neutral-900 py-5 px-5 rounded-lg">
      <BookCover readonly cover={book.cover} id={bookId} />

      <div className="flex-col justify-between">
        <BookInfo description={book?.description} title={book?.title} />

        <ButtonClient
          as="a"
          className="flex-1 self-end"
          href={`/book/read/${bookId}`}
          size="md"
          variant="shadow"
        >
          Ler
        </ButtonClient>
      </div>
    </div>
  );
}
