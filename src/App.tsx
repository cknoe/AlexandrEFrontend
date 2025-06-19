import { useState } from "react";
import CardsList from "./components/CardsList"
import Header from "./components/Header"
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import "./css/main.css"

export default function App() {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);

    return (
        <>
        <Header onOpenModal={openModal}/>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <LoginForm></LoginForm>
        </Modal>
        <main className="main">
            <CardsList></CardsList>
        </main>
        </>
    )
}