import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from './FloatingActions.js';
import RouteLoader from './RouteLoader';

const MainLayout = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <RouteLoader>
        <Outlet />
      </RouteLoader>
    </main>
    <Footer />
    <FloatingActions />
  </>
);

export default MainLayout;