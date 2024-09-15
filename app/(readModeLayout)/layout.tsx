import '@/styles/globals.css';
import { Link } from '@nextui-org/link';

import { ReadModeNavbar } from '@/components/read-mode-navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <ReadModeNavbar />

      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/GuilhermeSousaDev"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">GuilhermeSousaDev</p>
        </Link>
      </footer>
    </div>
  );
}
