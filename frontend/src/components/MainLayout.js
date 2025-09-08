import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from './FloatingActions.js';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16 sm:pt-20 bg-white dark:bg-black transition-colors duration-300">
      <Outlet />
    </main>
    <Footer />
    <FloatingActions />
  </>
);

export default MainLayout;