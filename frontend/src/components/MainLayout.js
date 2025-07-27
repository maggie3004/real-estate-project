import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from './FloatingActions.js';

const MainLayout = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <Outlet />
    </main>
    <Footer />
    <FloatingActions />
  </>
);

export default MainLayout;