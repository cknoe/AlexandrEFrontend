import { Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import LoginForm from './components/Authorization/LoginForm'
import CardsContainer from './components/Cards/CardsContainer'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CardsContainer />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
