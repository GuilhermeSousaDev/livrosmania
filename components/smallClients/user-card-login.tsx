'use client';

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

import LoginModal from '../modals/login';

interface UserCardLoginProps {
  isLogged: boolean;
  image?: string | null;
}

export default function UserCardLogin({ isLogged, image }: UserCardLoginProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onOpenChange={() => setShowLoginModal(false)}
      />

      {isLogged ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar size="sm" src={image ?? ''} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownSection showDivider>
              <DropdownItem key="profile" as="a" href="/profile">
                Perfil
              </DropdownItem>
              <DropdownItem key="books" as="a" href="/">
                Ver livros
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Avatar size="sm" src={''} onClick={() => setShowLoginModal(true)} />
      )}
    </>
  );
}
