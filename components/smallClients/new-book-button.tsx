'use client';
import { Link } from '@nextui-org/link';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { useState } from 'react';

import LoginModal from '../modals/login';

import { TooltipClient } from './tooltip-client';

interface NewBookButtonProps {
  isLogged: boolean;
}

export default function NewBookButton({ isLogged }: NewBookButtonProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onOpenChange={() => setShowLoginModal(false)}
      />

      {isLogged ? (
        <TooltipClient content="Novo livro">
          <Link
            className="text-inherit no-underline"
            href="/create"
          >
            <FaPlusCircle size={18} />
          </Link>
        </TooltipClient>
      ) : (
        <TooltipClient content="Novo livro">
          <FaPlusCircle size={18} onClick={() => setShowLoginModal(true)} />
        </TooltipClient>
      )}
    </>
  );
}
