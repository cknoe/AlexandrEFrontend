import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header.tsx'
import Modal from './components/Modal.tsx'
import { ModalProvider } from './Contexts/ModalContext.tsx'
import AppRoutes from './Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ModalProvider>
        <Header/>
        <Modal/>
        <AppRoutes/>
      </ModalProvider>
    </Router>
  </StrictMode>,
)
