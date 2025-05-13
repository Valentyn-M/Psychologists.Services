import React, { Suspense } from 'react';
import AppBar from '../AppBar/AppBar';

export interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <AppBar />
      </header>
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </>
  );
};

export default layout;
