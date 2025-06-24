import { Link } from 'react-router-dom'
import { useModal } from '../Contexts/ModalContext'
import LoginForm from './LoginForm'
import '../css/header.css'

export default function Header() {
  const { openModal } = useModal()
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
      </header>
      <div className="blankspace"></div>
    </>
  )
}
