import { AuthProvider } from './components/Authorization/AuthContext.tsx'
import { ModalProvider } from './components/Modal/ModalProvider.tsx'
import Header from './components/Header.tsx'
import Modal from './components/Modal/Modal.tsx'
import AppRoutes from './Routes.tsx'
import './css/main.css'
import { CollectionProvider } from './components/Collections/CollectionProvider.tsx'
import { DraftProvider } from './components/Draft/DraftProvider.tsx'

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <CollectionProvider>
          <DraftProvider>
            <Header />
            <Modal />
            <main className="main">
              <AppRoutes />
            </main>
          </DraftProvider>
        </CollectionProvider>
      </ModalProvider>
    </AuthProvider>
  )
}
