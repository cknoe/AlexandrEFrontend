import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from './AuthContext'
import { useModal } from '../../hooks/useModal'

import '../../css/form.css'

export default function LoginForm() {
  const { login, register } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerif, setPasswordVerif] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordVerif, setShowPasswordVerif] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [mode, setMode] = useState('login')
  const { closeModal } = useModal()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const usernameRegex: RegExp = /^[A-Za-z0-9_]{1,30}$/

    if (mode === 'login') {
      try {
        await login(username, password)
        closeModal()
      } catch {
        setErrorMessage('Wrong user or password')
      }
    } else {
      if (password === passwordVerif) {
        try {
          if (!usernameRegex.test(username)) {
            setErrorMessage(
              'Username must be 1 to 30 characters : letters, numbers or underscore only',
            )
            return
          }
          await register(username, password)
          closeModal()
        } catch {
          setErrorMessage('User ' + username + ' already exists')
        }
      } else {
        setErrorMessage('Both password must match')
      }
    }
  }

  function changeMode() {
    if (mode === 'login') {
      setMode('register')
    } else {
      setMode('login')
    }
  }

  return (
    <>
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

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {mode === 'register' && (
          <>
            <label>Repeat password</label>
            <div
              className="password-field"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type={showPasswordVerif ? 'text' : 'password'}
                name="passwordVerif"
                value={passwordVerif}
                onChange={(e) => setPasswordVerif(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPasswordVerif((prev) => !prev)}
              >
                {showPasswordVerif ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </>
        )}

        <div className="error-message">{errorMessage}</div>

        <br />
        <button type="submit">
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </button>
      </form>
      <div className="small-text center">
        {mode === 'login' ? 'Need an account ? ' : 'Already have an account ? '}
        <span className="clickable-text" onClick={() => changeMode()}>
          {mode === 'register' ? 'Log In ' : 'Create one '}
        </span>
        !
      </div>
    </>
  )
}
