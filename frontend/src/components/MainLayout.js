import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from './FloatingActions';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>{children}</main>
    <Footer />
    <FloatingActions />
  </>
);

export default MainLayout; 