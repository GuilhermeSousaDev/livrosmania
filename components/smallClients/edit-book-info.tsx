/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { MouseEvent, useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import classNames from 'classnames';
import { Spinner } from '@nextui-org/react';

import { subtitle, title } from '../primitives';

import { updateBook } from '@/app/services/book';

interface EditBookInfoProps {
  id: string;
  title: string;
  description?: string;
}

export default function EditBookInfo({ id, ...book }: EditBookInfoProps) {
  const [currentBookInfo, setCurrentBookInfo] = useState({
    title: book.title,
    description: book.description,
  });

  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isTitleLoading, setIsTitleLoading] = useState(false);
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCancelEdit = (
    e: MouseEvent<SVGElement>,
    type: 'title' | 'description',
  ) => {
    e.stopPropagation();

    if (type === 'title') {
      setNewTitle('');
      setIsEditingTitle(false);
    }

    if (type === 'description') {
      setNewDescription('');
      setIsEditingDescription(false);
    }
  };

  const handleConfirmTitleEdit = async (title: string) => {
    setIsTitleLoading(true);

    const { ok, book } = await updateBook(id, {
      title,
    });

    if (ok && book.title === title) {
      setNewTitle('');
      setIsEditingTitle(false);
      setCurrentBookInfo({
        ...currentBookInfo,
        title,
      });
    }

    setIsTitleLoading(false);
  };

  const handleConfirmDescriptionEdit = async (description: string) => {
    setIsDescriptionLoading(true);
    const { ok, book } = await updateBook(id, {
      description,
    });

    if (ok && book.description === description) {
      setNewTitle('');
      setIsEditingDescription(false);
      setCurrentBookInfo({
        ...currentBookInfo,
        description,
      });
    }

    setIsDescriptionLoading(false);
  };

  return (
    <div>
      <div
        className={classNames('flex gap-5 items-center', {
          'mb-2': isEditingTitle,
        })}
        onClick={() => setIsEditingTitle(true)}
        onMouseEnter={() => setShowTitleEdit(true)}
        onMouseLeave={() => setShowTitleEdit(false)}
      >
        {isEditingTitle ? (
          <Input
            defaultValue={currentBookInfo.title}
            onChange={({ target: { value } }) => setNewTitle(value)}
          />
        ) : isTitleLoading ? (
          <Spinner />
        ) : (
          <h2 className={title()}>{currentBookInfo.title ?? 'Sem título'}</h2>
        )}
        {showTitleEdit && !isEditingTitle && (
          <FaEdit className="cursor-pointer" size={20} />
        )}
        {isEditingTitle && (
          <div className="flex items-center gap-2">
            <FaCheck
              className="cursor-pointer"
              size={20}
              onClick={() => handleConfirmTitleEdit(newTitle)}
            />
            <FaTimes
              className="cursor-pointer"
              size={20}
              onClick={(e) => handleCancelEdit(e, 'title')}
            />
          </div>
        )}
      </div>

      <div
        className={classNames('flex gap-5 items-center', {
          'my-2': isEditingDescription,
        })}
        onClick={() => setIsEditingDescription(true)}
        onMouseEnter={() => setShowDescriptionEdit(true)}
        onMouseLeave={() => setShowDescriptionEdit(false)}
      >
        {isEditingDescription ? (
          <Textarea
            defaultValue={currentBookInfo.description}
            rows={3}
            onChange={({ target: { value } }) => setNewDescription(value)}
          >
            {currentBookInfo.description}
          </Textarea>
        ) : isDescriptionLoading ? (
          <Spinner />
        ) : (
          <p className={classNames(subtitle(), 'max-w-[900px]')}>
            {currentBookInfo.description ?? 'Sem descrição'}
          </p>
        )}
        {showDescriptionEdit && !isEditingDescription && (
          <FaEdit className="cursor-pointer" size={20} />
        )}
        {isEditingDescription && (
          <div className="flex items-center gap-2">
            <FaCheck
              className="cursor-pointer"
              size={20}
              onClick={() => handleConfirmDescriptionEdit(newDescription)}
            />
            <FaTimes
              className="cursor-pointer"
              size={20}
              onClick={(e) => handleCancelEdit(e, 'description')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
