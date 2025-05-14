import AppBar from '@/components/AppBar/AppBar';
import { Suspense } from 'react';
import s from './Layout.module.scss';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className={s.header}>
        <AppBar />
      </header>
      <main className={s.main}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
