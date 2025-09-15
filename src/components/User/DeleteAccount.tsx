import { apiDeleteUser } from "../../api/users"
import { useAuth } from "../Authorization/AuthContext"
import { useModal } from "../Modal/ModalContext";
import { Trash2 } from "lucide-react";

export default function DeleteAccount() {

  const { logout } = useAuth();
  const { closeModal } = useModal();

  async function handleClick() {
    await apiDeleteUser()
    logout() 
    closeModal()
  }

  return (
    <>
      <button className="red-button edit-field-button" onClick={handleClick}><h3  className="text-with-icon"><Trash2 />Delete Profile</h3></button>
    </>
  )
}