import { apiDeleteUser } from "../../api/users"
import { useAuth } from "../Authorization/AuthContext"
import { useModal } from "../Modal/ModalContext";
import { Trash2 } from "lucide-react";

export default function DeleteAccount() {

  const { logout } = useAuth();
  const { closeModal } = useModal();

  async function handleClick() {
    const isConfirmed: boolean = confirm("You are about to delete your account, are you sure ? You won't be able to retrieve it after this.")
    if (isConfirmed) {
      await apiDeleteUser()
      logout() 
      closeModal()
    }
  }

  return (
    <>
      <button className="red-button edit-field-button" onClick={handleClick}><h3  className="text-with-icon"><Trash2 />Delete Account</h3></button>
    </>
  )
}