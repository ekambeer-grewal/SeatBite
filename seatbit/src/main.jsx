import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Onboarding from './Onboarding.jsx'
import signUp from './signUp.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)