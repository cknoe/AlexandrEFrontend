import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

  const [title, setTitle] = useState(() =>
    typeof document !== 'undefined' ? document.title : '',
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    const titleEl = document.querySelector('title')
    if (!titleEl) return
    const observer = new MutationObserver(() => setTitle(document.title))
    observer.observe(titleEl, { childList: true })
    return () => observer.disconnect()
  }, [])
  return (
    <>
      <header className="header">
        <div className="header-left">
          <h2 className="header-logo">hello</h2>
        </div>
        <div className="header-center">
          <h2 className="header-title">{title}</h2>
        </div>
        <div className="header-right">
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
        </div>
      </header>
      <div className="blankspace"></div>
    </>
  )
}
