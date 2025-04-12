import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'

import App from './App.tsx'
import RegisterPage from './pages/Authentication/RegisterPage/registerPage'
import LoginPage from './pages/Authentication/LoginPage/loginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>,
)
