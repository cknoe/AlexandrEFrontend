import React, { createContext, useContext, useState } from 'react'
import '../css/modal.css'

type ModalContextType = {
  isModalOpen: boolean
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
  modalContent: React.ReactNode | null
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
  const openModal = (content: React.ReactNode) => {
    setModalOpen(true)
    setModalContent(content)
  }
  const closeModal = () => setModalOpen(false)
  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within a ModalProvider')
  return context
}
