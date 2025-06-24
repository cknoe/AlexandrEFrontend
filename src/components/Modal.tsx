import LoginForm from './LoginForm'
import { useModal } from '../Contexts/ModalContext'
import '../css/modal.css'

export default function Modal() {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null;
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>
          <LoginForm/>
      </div>
    </div>
  )
}
