import React, { createContext, useContext, useState } from 'react';
import '../css/modal.css'

const ModalContext = createContext<{
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
        {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext);
}