import { useState } from 'react'
import { useAuth } from '../Authorization/AuthContext'
import { Pen, PenOff } from 'lucide-react'
import UsernameForm from './UsernameForm'
import '../../css/user.css'
import PasswordForm from './PasswordForm'
import { Trash2 } from 'lucide-react'
import { useModal } from '../Modal/ModalContext'
import DeleteAccount from './DeleteAccount'

export default function User() {
  const [isChangeUsername, setIsChangeUsername] = useState<boolean>(false)
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
  const username: string = useAuth().contextUsername!
  const { openModal } = useModal()

  function handleClickDelete() {
    openModal(<DeleteAccount />)
  }

  return (
    <>
      <h2>Your Profile</h2>
      <div className="user-div">
        <div className="user-column user-info">
          {isChangeUsername ? (
            <UsernameForm hideField={() => setIsChangeUsername(false)} />
          ) : (
            <div>Username : {username}</div>
          )}
        </div>
        <div className="user-column user-edit">
          {isChangeUsername ? (
            <button
              className="red-button edit-field-button"
              onClick={() => setIsChangeUsername(false)}
            >
              <PenOff />
            </button>
          ) : (
            <button
              className="edit-field-button"
              onClick={() => {
                setIsChangeUsername(true)
                setIsChangePassword(false)
              }}
            >
              <Pen />
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="user-div">
        <div className="user-column user-info">
          {isChangePassword ? (
            <PasswordForm hideField={() => setIsChangePassword(false)} />
          ) : (
            <div>Password : ***</div>
          )}
        </div>
        <div className="user-column user-edit">
          {isChangePassword ? (
            <button
              className="red-button edit-field-button"
              onClick={() => setIsChangePassword(false)}
            >
              <PenOff />
            </button>
          ) : (
            <button
              className="edit-field-button"
              onClick={() => {
                setIsChangePassword(true)
                setIsChangeUsername(false)
              }}
            >
              <Pen />
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="user-div center">
        <button
          className="red-button edit-field-button"
          onClick={handleClickDelete}
        >
          <h3 className="text-with-icon">
            <Trash2 />
            Delete Account
          </h3>
        </button>
      </div>
    </>
  )
}
