import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Suppress UNSAFE_componentWillMount warning from third-party libraries
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && 
      (args[0].includes('UNSAFE_componentWillMount') || 
       args[0].includes('SideEffect(NullComponent)'))) {
    return;
  }
  originalWarn.apply(console, args);
};

AOS.init({
  duration: 900,
  once: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

