'use client';
import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { useRouter } from 'next/navigation';

import ConfirmDeleteModal from './modals/confirm-delete';

import { BookDocument } from '@/app/api/models/Book';
import { removeBook } from '@/app/services/book';

interface UserBookCardProps {
  book: BookDocument;
}

export const UserBookCard = ({ book }: UserBookCardProps) => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleRemoveBook = async () => {
    const { ok, book: updatedBook } = await removeBook(book._id);

    if (ok && updatedBook.isDeleted) {
      router.refresh();
      onClose();
    }
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full"
      shadow="sm"
    >
      <ConfirmDeleteModal
        isOpen={isOpen}
        onConfirm={handleRemoveBook}
        onOpenChange={onOpenChange}
      />
      <CardBody>
        <div className="flex items-start gap-5">
          <Image
            alt="Album cover"
            className="object-cover"
            height={200}
            shadow="md"
            src={book?.cover}
            width="130"
          />

          <div className="flex justify-between items-start w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-0">
                <h1 className="text-large font-medium mt-2">{book.title}</h1>
                <p className="text-small text-foreground/80">
                  {book.description
                    ? book.description.length > 100
                      ? `${book.description.substring(0, 100)}...`
                      : book.description
                    : 'Sem descrição'}
                </p>
              </div>

              <div>
                <Button
                  isIconOnly
                  as="a"
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  href={`create/${book._id}`}
                  radius="full"
                  variant="light"
                >
                  <FaEdit size={20} />
                </Button>
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onClick={onOpen}
                >
                  <FaTrash size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
