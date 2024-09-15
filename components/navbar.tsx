import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';
import NextLink from 'next/link';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { getServerSession } from 'next-auth';

import UserCardLogin from './smallClients/user-card-login';
import NewBookButton from './smallClients/new-book-button';

import { siteConfig } from '@/config/site';
import { GithubIcon, SearchIcon, Logo } from '@/components/icons';
import { authOptions } from '@/config/auth';

export const Navbar = async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Pesquisar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar shouldHideOnScroll maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Livrosmania</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex">{searchInput}</NavbarItem>

        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer flex items-center gap-2">
          <NewBookButton isLogged={!!user?.email} />
        </NavbarItem>

        <NavbarItem className="hidden md:flex cursor-pointer">
          <UserCardLogin image={user?.image} isLogged={!!user?.email} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <NavbarItem className="cursor-pointer flex items-center gap-2">
          <FaPlusCircle />
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>{searchInput}</NavbarMenu>
    </NextUINavbar>
  );
};
