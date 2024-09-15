'use client';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Delta } from 'quill/core';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { updateBook } from '@/app/services/book';
import { useDebounceFn } from '@/utils/debounce';

interface EditorProps {
  id: string;
  content?: Delta;
}

export default function Editor({ id, content }: EditorProps) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    if (quillRef.current || !editorRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        clipboard: {
          matchVisual: false,
        },
        imageResize: {
          modules: ['Resize', 'DisplaySize', 'Toolbar'],
        },
      },
    });

    if (content) quillRef.current?.setContents(content);

    if (!quillRef.current) return;

    quillRef.current?.on('text-change', handleSaveContentDebounce);

    return () => {
      quillRef.current?.on('text-change', handleSaveContentDebounce);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | string | number | undefined;

    const handleMouseMove = () => {
      setShowSaveButton(true);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setShowSaveButton(false);
      }, 500); 
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const handleSaveContent = async () => {
    const delta = quillRef?.current?.getContents();

    if (!delta) return;

    const { ok } = await updateBook(id, {
      content: delta,
    });

    if (ok) showToast();
  };

  const handleSaveContentDebounce = useDebounceFn(
    async () => handleSaveContent(),
    1000,
  );

  const handleSaveContentAndLeave = async () => {
    handleSaveContent();
    router.back();
  };

  return (
    <div>
      <div
        ref={editorRef}
        style={{ minHeight: '400px', padding: '0 10px', marginBottom: '20px' }}
      />

      {showSaveButton && (
        <Button
          className="fixed bottom-10 left-10"
          variant="faded"
          onClick={handleSaveContentAndLeave}
        >
          Salvar e sair <FaCheck />
        </Button>
      )}
    </div>
  );
}

function showToast() {
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
}
