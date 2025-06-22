import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm.tsx'
import App from './pages/App.tsx'
import Header from './components/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  </StrictMode>,
)
