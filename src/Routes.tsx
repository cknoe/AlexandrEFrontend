import { Route, Routes } from 'react-router-dom'
import App from './App'
import Error from './components/Error'
import LoginForm from './components/Authorization/LoginForm'
import CardsList from './components/Cards/CardsList'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CardsList />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
