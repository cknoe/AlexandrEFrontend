import { Link } from 'react-router-dom'
import { useModal } from './Modal/ModalContext'
import LoginForm from './Authorization/LoginForm'
import { useAuth } from './Authorization/AuthContext'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import '../css/header.css'
import { Home, User, Settings, LogOut } from 'lucide-react'
import UserPanel from './User/User'

export default function Header() {
  const { openModal } = useModal()
  const { token, logout, contextUsername } = useAuth()
  return (
    <>
      <header className="header">
        <Link to="/">
          <button>
            <div className="text-with-icon">
              <Home size={16} /> Home
            </div>
          </button>
        </Link>
        {!token ? (
          <>
            <button onClick={() => openModal(<LoginForm />)}>
              <div className="text-with-icon">
                <User size={16} />
                Login/Register
              </div>
            </button>
          </>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="dropdown-trigger">
              <div className="text-with-icon">
                <User size={16} />
                {contextUsername}
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="dropdown-content">
              <DropdownMenu.Item
                className="dropdown-item"
                onClick={() => openModal(<UserPanel />)}
              >
                <a className="text-with-icon">
                  <Settings /> Profile
                </a>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="dropdown-item">
                <Link to="/draft" onClick={() => logout()}>
                  <div className="text-with-icon">
                    <LogOut /> Logout
                  </div>
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </header>
      <div className="blankspace"></div>
    </>
  )
}
