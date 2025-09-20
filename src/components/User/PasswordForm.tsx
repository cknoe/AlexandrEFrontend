import { useState } from 'react'
import '../../css/form.css'
import { useAuth } from '../Authorization/AuthContext'
import { apiModifyUser, type ApiUserResponse } from '../../api/users'
import type { UserFormProps } from './userTypes'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordForm(props: UserFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordVerif, setShowPasswordVerif] = useState<boolean>(false)
  const [newPassword, setNewpassword] = useState<string>('')
  const [newPasswordCheck, setNewpasswordCheck] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { contextUsername, setTokenAndStore } = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newPassword === '') {
      setErrorMessage("Password can't be empty")
      return null
    }

    if (newPassword !== newPasswordCheck) {
      setErrorMessage('Both password must match')
      return null
    }

    try {
      const response: ApiUserResponse = await apiModifyUser(
        contextUsername!,
        newPassword,
      )
      setTokenAndStore(response.token)
      props.hideField()
    } catch {
      setErrorMessage('Server Error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <label>New Password</label>
      <div
        className="password-field"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewpassword(e.target.value)}
          name="new-password"
        />

        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <label>Repeat New Password</label>
      <div
        className="password-field"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          type={showPasswordVerif ? 'text' : 'password'}
          value={newPasswordCheck}
          onChange={(e) => setNewpasswordCheck(e.target.value)}
          name="new-password-check"
        />

        <button
          type="button"
          onClick={() => setShowPasswordVerif((prev) => !prev)}
        >
          {showPasswordVerif ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="error-message">{errorMessage}</div>

      <button type="submit">Edit</button>
    </form>
  )
}
