import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from '@nextui-org/navbar';
import NextLink from 'next/link';

import { ThemeSwitch } from './theme-switch';
import NavigationBack from './smallClients/navigation-back';

import { Logo } from '@/components/icons';

export const ReadModeNavbar = () => {
  return (
    <NextUINavbar shouldHideOnScroll maxWidth="xl" position="sticky">
      <NavigationBack />

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <ThemeSwitch />
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Livrosmania</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
    </NextUINavbar>
  );
};
