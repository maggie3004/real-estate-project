import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter } from 'react-router-dom';

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

// For the SGS QR landing page — render it directly, completely bypassing
// the App component (and its 6-second LoadingScreen) so QR scanners see
// content instantly. All other routes use the normal App.
const isSgsRoute = window.location.pathname.toLowerCase().startsWith('/shree-ganesh-srushti');

if (isSgsRoute) {
  // Lazy-import to keep the main bundle lean
  import('./pages/SgsLandingPage').then(({ default: SgsLandingPage }) => {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <SgsLandingPage />
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
