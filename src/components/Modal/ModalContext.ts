import { createContext } from 'react'

type ModalContextType = {
  modalStack: React.ReactNode[]
  isModalOpen: boolean
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
  backModal: () => void
  modalContent: React.ReactNode | null
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
)
