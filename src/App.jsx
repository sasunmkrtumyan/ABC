import { Navigate, Route, Routes } from 'react-router-dom'
import ComingSoon from './pages/comingSoon.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
