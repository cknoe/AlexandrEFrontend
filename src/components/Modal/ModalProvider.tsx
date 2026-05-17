import React, { useState } from 'react'
import { ModalContext } from './ModalContext'

type ModalProviderProps = {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<React.ReactNode[]>([])

  const openModal = (content: React.ReactNode) => {
    setModalStack((prev) => [...prev, content])
  }

  const closeModal = () => setModalStack([])

  const backModal = () => {
    setModalStack((prev) => prev.slice(0, prev.length - 1))
  }

  const modalContent = modalStack[modalStack.length - 1] || null
  const isModalOpen = modalStack.length > 0

  return (
    <ModalContext.Provider
      value={{
        modalStack,
        isModalOpen,
        openModal,
        closeModal,
        backModal,
        modalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
