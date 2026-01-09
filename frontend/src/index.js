import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

