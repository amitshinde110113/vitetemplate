import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './MainLayout.css';

export const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
