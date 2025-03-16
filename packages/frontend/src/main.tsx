import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '../i18n'

// TODO add health check

createRoot(document.getElementById('root')!).render(<StrictMode>
  <App/>
</StrictMode>)