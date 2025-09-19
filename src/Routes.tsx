import { Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import CardsContainer from './components/Cards/CardsContainer'
import CollectionList from './components/Collections/CollectionList'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><CollectionList /><CardsContainer /></>} />
      <Route path="/:collectionIdParam" element={<><CollectionList /><CardsContainer /></>} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
