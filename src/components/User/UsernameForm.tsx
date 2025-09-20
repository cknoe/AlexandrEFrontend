import { useState } from 'react'
import { useAuth } from '../Authorization/AuthContext'
import '../../css/form.css'
import { apiModifyUser, type ApiUserResponse } from '../../api/users'
import type { UserFormProps } from './userTypes'

export default function UsernameForm(props: UserFormProps) {
  const { contextUsername, setTokenAndStore, setUsernameAndStore } = useAuth()
  const [username, setUsername] = useState<string>(contextUsername!)
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const usernameRegex: RegExp = /^[A-Za-z0-9_]{1,30}$/

    if (username === '' || username.length > 30) {
      setErrorMessage('1-30 chars')
      return null
    }

    if (!usernameRegex.test(username)) {
      setErrorMessage('letters numbers underscore')
      return
    }

    try {
      const response: ApiUserResponse = await apiModifyUser(username, '')
      setUsernameAndStore(response.userDTO.username)
      setTokenAndStore(response.token)
      props.hideField()
    } catch {
      setErrorMessage('Server Error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="username-form compact-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username"
      />

      <div className="error-message">{errorMessage}</div>

      <button type="submit">Edit</button>
    </form>
  )
}
