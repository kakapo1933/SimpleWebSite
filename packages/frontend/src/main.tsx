import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '../i18n';
import { Toaster } from 'react-hot-toast';

// TODO add health check

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    <App />
  </StrictMode>
);
