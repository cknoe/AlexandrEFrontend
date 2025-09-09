import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from './AuthContext'
import { useModal } from '../Modal/ModalContext'

import '../../css/form.css'

export default function LoginForm() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { closeModal } = useModal()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await login(username, password)
    } catch {
      alert('Erreur de connexion')
    }
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>Username</label>
      <input
        value={username}
        name="user_id"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password</label>
      <div
        className="password-field"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <br />
      <button type="submit">Se connecter</button>
    </form>
  )
}
