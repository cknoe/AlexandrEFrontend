import { Route, Routes } from 'react-router-dom'
import App from './App'
import Error from './components/Error'
import LoginForm from './components/LoginForm'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
