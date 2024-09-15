import { subtitle } from "./primitives";
import BooksCarousel from "./books-carousel";

import { BookDocument } from "@/app/api/models/Book";

interface BookSectionProps {
  books: BookDocument[];
  title: string;
}

export default function BookSection({ books, title }: BookSectionProps) {
  return (
    <div className="flex flex-col gap-2 bg-neutral-950 p-3 rounded-md">
      <span className={subtitle()}>{title}</span>

      <BooksCarousel books={books} />
    </div>
  );
}
