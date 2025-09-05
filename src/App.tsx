import { AuthProvider } from './components/Authorization/AuthContext.tsx'
import { ModalProvider } from './components/Modal/ModalContext.tsx'
import Header from './components/Header.tsx'
import Modal from './components/Modal/Modal.tsx'
import AppRoutes from './Routes.tsx'
import './css/main.css'

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Header />
        <Modal />
        <main className="main">
          <AppRoutes />
        </main>
      </ModalProvider>
    </AuthProvider>
  )
}