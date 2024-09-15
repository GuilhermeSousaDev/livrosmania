import React from 'react';

import { ButtonClient } from '@/components/smallClients/button-client';
import BookCover from '@/components/smallClients/book-cover';
import EditBookInfo from '@/components/smallClients/edit-book-info';
import { showBook } from '@/app/services/book';

interface EditBookDetailsParams {
  params: {
    bookId: string;
  };
}

export default async function EditBookDetails({
  params,
}: EditBookDetailsParams) {
  const { bookId } = params;

  const book = await showBook(bookId);

  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-neutral-900 py-5 px-5 rounded-lg">
      <BookCover cover={book.cover} id={bookId} />

      <div>
        <EditBookInfo
          description={book?.description}
          id={bookId}
          title={book?.title}
        />

        <ButtonClient
          as="a"
          className="flex-1"
          href={`/create/${bookId}/write`}
          size="lg"
          variant="faded"
        >
          Escrever
        </ButtonClient>
      </div>
    </div>
  );
}
