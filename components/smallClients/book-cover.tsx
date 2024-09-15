'use client';
import { Button, Image } from '@nextui-org/react';
import { FaUpload } from '@react-icons/all-files/fa/FaUpload';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { uploadBookCover } from '@/app/services/book';

interface BookCoverProps {
  id: string;
  cover?: string;
  readonly?: boolean;
}

export default function BookCover({ id, cover, readonly }: BookCoverProps) {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    const file = acceptedFiles[0];

    const url = URL.createObjectURL(file);

    setPreview(url);
    setFileToUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  const handleUploadImage = async () => {
    if (!fileToUpload) return;

    setIsLoading(true);

    const formData = new FormData();

    formData.append('file', fileToUpload);

    const { ok, book } = await uploadBookCover(id, formData);

    setIsLoading(false);

    if (ok && book?.cover) {
      toast(
        <div className="flex items-center">
          <FaCheck className="mr-8" />
          Salvo
        </div>,
        {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        },
      );

      router.refresh();

      setPreview(null);
      setFileToUpload(null);
    }
  };

  return (
    <div>
      {preview ? (
        <div className="flex flex-col gap-5" {...(!readonly ? getRootProps() : {})}>
          <Image
            alt="Orange"
            className={classNames(
              'object-cover h-[200px]',
              !readonly ? 'cursor-pointer' : '',
            )}
            radius="md"
            shadow="sm"
            src={preview}
            width={125}
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={handleUploadImage}
          >
            Confirmar
          </Button>
        </div>
      ) : cover ? (
        <div {...(!readonly ? getRootProps() : {})}>
          <Image
            alt="Orange"
            className={classNames(
              'object-cover h-[200px]',
              !readonly ? 'cursor-pointer' : '',
            )}
            radius="md"
            shadow="sm"
            src={cover}
            width={125}
          />
        </div>
      ) : (
        <div
          className={classNames(
            'flex flex-col items-center justify-center h-[200px] rounded-md w-[125px] cursor-pointer border-2 border-gray-400',
            isDragActive ? 'border-dashed' : 'border-solid',
          )}
        >
          <FaUpload />
          <input {...(!readonly ? getInputProps() : {})} />
        </div>
      )}
    </div>
  );
}
