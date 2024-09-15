'use client';
import { Tooltip, TooltipProps } from '@nextui-org/react';
import { ReactNode } from 'react';

interface TooltipClientProps extends TooltipProps {
  children: ReactNode;
  content: string;
}

export const TooltipClient = ({ children, ...props }: TooltipClientProps) => {
  return <Tooltip {...props}>{children}</Tooltip>;
};
