'use client';
import { Button, ButtonProps } from '@nextui-org/react';
import { ReactNode } from 'react';

interface ButtonClientProps extends ButtonProps {
  children: ReactNode;
}

export const ButtonClient = ({ children, ...props }: ButtonClientProps) => {
  return <Button {...props}>{children}</Button>;
};
