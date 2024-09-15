'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import LoginModal from './modals/login';

export default function MainCard() {
  const { status } = useSession();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRedirect = () => {
    if (status === 'unauthenticated') return setShowLoginModal(true);

    router.push('/create');
  };

  return (
    <div className="max-w-full gap-2 grid grid-cols-12 grid-rows-2 mb-16">
      <LoginModal
        isOpen={showLoginModal}
        onOpenChange={() => setShowLoginModal(false)}
      />

      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-white font-medium text-2xl">Venda seus livros</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://i.pinimg.com/564x/9f/47/b1/9f47b1b74e2b54063e07b99f430916c5.jpg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Disponível em breve.</p>
            <p className="text-black text-tiny">Receber notificação.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Me avise
          </Button>
        </CardFooter>
      </Card>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Dê vida às suas histórias e ideias!
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Publique e divulgue suas ideias no melhor site para escritores
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Writing a book"
          className="z-0 w-full h-full object-cover"
          src="https://images.pexels.com/photos/5828620/pexels-photo-5828620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://nextui.org/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">
                Escrever é apenas o começo.
              </p>
              <p className="text-tiny text-white/60">
                Publique suas ideias e veja onde elas podem te levar!
              </p>
            </div>
          </div>
          <Button radius="full" size="sm" onClick={handleRedirect}>
            Comece a escrever
          </Button>
        </CardFooter>
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            O que ler?
          </p>
          <h4 className="text-white font-medium text-large">
            Procure os melhores livros
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://nextui.org/images/card-example-4.jpeg"
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Criatividade
          </p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://nextui.org/images/card-example-3.jpeg"
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Inovação
          </p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://nextui.org/images/card-example-2.jpeg"
        />
      </Card>
    </div>
  );
}
