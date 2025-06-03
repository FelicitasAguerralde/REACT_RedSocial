import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
    </>
  )
}
