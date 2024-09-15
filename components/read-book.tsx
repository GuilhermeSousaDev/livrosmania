'use client';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { useEffect, useRef } from 'react';
import { Delta } from 'quill/core';

interface EditorProps {
  id: string;
  content?: Delta;
}

export default function ReadBook({ content }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current || !editorRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      readOnly: true,
      modules: {
        toolbar: false,
      },
      theme: 'snow',
    });

    if (content) quillRef.current?.setContents(content);
  }, []);

  return (
    <div>
      <div
        ref={editorRef}
        className="min-h-[400px] px-2 mb-5 border-none text-medium"
        style={{ border: 'none' }}
      />
    </div>
  );
}
