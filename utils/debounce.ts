'use client';
import { useRef } from 'react';

type Callback<T extends any[]> = (...args: T) => void;

export function useDebounceFn<T extends Callback<any[]>>(
  callback: T,
  delay: number,
): Callback<Parameters<T>> {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => callback(...args), delay);
  };
}
