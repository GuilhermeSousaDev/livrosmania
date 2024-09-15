import { Delta } from 'quill/core';

import { showBook } from '@/app/services/book';
import Editor from '@/components/editor';

interface EditBookDetailsParams {
  params: {
    bookId: string;
  };
}

export default async function WriteBook({ params }: EditBookDetailsParams) {
  const { bookId } = params;

  const book = await showBook(bookId);

  return (
    <div>
      <Editor content={book.content as unknown as Delta} id={bookId} />
    </div>
  );
}
