'use client';
import { Avatar, AvatarProps } from '@nextui-org/react';

interface AvatarClientProps extends AvatarProps {
  className?: string;
}

export default function AvatarClient(props: AvatarClientProps) {
  return <Avatar {...props} />;
}
