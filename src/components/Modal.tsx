import type React from "react"
import "../css/modal.css"

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal ({isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;
    else return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>
            {children}
            </div>
        </div>
    )
}