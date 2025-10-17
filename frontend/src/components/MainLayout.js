import React from 'react';
import FloatingCallButton from './FloatingCallButton';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


const MainLayout = () => (
  <div className="relative w-full min-h-screen">
    <Navbar />
    <main className="app-main min-h-screen pt-16 sm:pt-20 bg-white dark:bg-black transition-colors duration-300">
      <Outlet />
    </main>
  <Footer />
  <FloatingCallButton />
  </div>
);

export default MainLayout;