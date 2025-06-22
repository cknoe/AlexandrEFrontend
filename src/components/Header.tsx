import { Link } from 'react-router-dom'
import '../css/header.css'

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/">Accueil</Link>
        <Link to="/login ">Login</Link>
      </header>
      <div className="blankspace"></div>
    </>
  )
}
