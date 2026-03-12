import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Suppress UNSAFE_componentWillMount warning from third-party libraries (react-helmet)
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string' &&
    (message.includes('UNSAFE_componentWillMount') ||
      message.includes('SideEffect(NullComponent)') ||
      message.includes('UNSAFE_component') ||
      message.includes('strict mode is not recommended'))) {
    return;
  }
  originalWarn.apply(console, args);
};

console.error = (...args) => {
  const message = args[0];
  if (typeof message === 'string' &&
    (message.includes('UNSAFE_componentWillMount') ||
      message.includes('SideEffect(NullComponent)'))) {
    return;
  }
  originalError.apply(console, args);
};

AOS.init({
  duration: 900,
  once: true,
});

const rootElement = document.getElementById('root');

// Define routes that should bypass the main App loading screen (Fast Load)
const path = window.location.pathname.toLowerCase();
const isSgsRoute = path.startsWith('/shree-ganesh-srushti');
const isThankYouRoute = path.startsWith('/thank-you');

if (isSgsRoute || isThankYouRoute) {
  // Render standalone router with just the essential routes for speed
  Promise.all([
    import('./pages/SgsLandingPage'),
    import('./pages/ThankYou')
  ]).then(([{ default: SgsLandingPage }, { default: ThankYou }]) => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/shree-ganesh-srushti" element={<SgsLandingPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* Fallback to SgsLandingPage if path is slightly off but in QR route */}
            {isSgsRoute && <Route path="*" element={<SgsLandingPage />} />}
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  });
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
