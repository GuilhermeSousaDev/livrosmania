'use client';
import { Button, Image } from '@nextui-org/react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { BookDocument } from '@/app/api/models/Book';

interface BooksCarouselProps {
  books: BookDocument[];
}

export default function BooksCarousel({ books }: BooksCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { scrollNext, scrollPrev } = emblaApi || {};
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const checkScroll = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', checkScroll);
    checkScroll();

    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="overflow-hidden relative">
      <div className="flex gap-2">
        {books.map((book) => (
          <div
            key={book._id}
            className="p-1 cursor-pointer min-w-[136px] min-h-[200px] transition-transform duration-300 hover:scale-105"
          >
            <Link href={`book/${book._id}`}>
              <Image
                alt={book.title}
                className="w-full h-full object-cover"
                radius="md"
                shadow="sm"
                src={book.cover}
              />
            </Link>
          </div>
        ))}
      </div>
      {canScrollPrev && (
        <Button
          isIconOnly
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scrollPrev?.()}
        >
          <FaAngleLeft className="text-2xl" />
        </Button>
      )}
      {canScrollNext && (
        <Button
          isIconOnly
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scrollNext?.()}
        >
          <FaAngleRight className="text-2xl" />
        </Button>
      )}
    </div>
  );
}
