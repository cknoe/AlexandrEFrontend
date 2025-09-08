import { Link } from 'react-router-dom'
import { useModal } from './Modal/ModalContext'
import LoginForm from './Authorization/LoginForm'
import { useAuth } from './Authorization/AuthContext'
import '../css/header.css'

export default function Header() {
  const { openModal } = useModal()
  const { logout } = useAuth();
  return (
    <>
      <header className="header">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/login ">
          <button>LoginPage</button>
        </Link>
        <button onClick={() => openModal(<LoginForm />)}>Modal</button>
        <button onClick={() => logout()}>Logout</button>
      </header>
      <div className="blankspace"></div>
    </>
  )
}
