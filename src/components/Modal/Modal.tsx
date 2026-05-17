import { useModal } from '../../hooks/useModal.ts'
import '../../css/modal.css'

export default function Modal() {
  const { modalStack, isModalOpen, closeModal, backModal, modalContent } =
    useModal()

  if (!isModalOpen) return null
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {modalStack.length > 1 && (
          <button className="modal-button modal-previous" onClick={backModal}>
            &lt;
          </button>
        )}
        <button className="modal-button modal-close" onClick={closeModal}>
          ×
        </button>
        {modalContent}
      </div>
    </div>
  )
}
