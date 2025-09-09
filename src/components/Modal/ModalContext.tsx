import React, { createContext, useContext, useState } from 'react'


type ModalContextType = {
  modalStack: React.ReactNode[]
  isModalOpen: boolean
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
  backModal: () => void;
  modalContent: React.ReactNode | null
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

type ModalProviderProps = {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<React.ReactNode[]>([]);

  const openModal = ( content: React.ReactNode) => {
    setModalStack((prev) => [...prev, content]);
  };

  const closeModal = () => setModalStack([]);

  const backModal = () => {
    setModalStack((prev) => prev.slice(0, prev.length - 1));
  };

  const modalContent = modalStack[modalStack.length - 1] || null;
  const isModalOpen = modalStack.length > 0;

  return (
    <ModalContext.Provider
      value={{ modalStack, isModalOpen, openModal, closeModal, backModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within a ModalProvider')
  return context
}
