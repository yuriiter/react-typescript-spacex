import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import './sass/_main.scss'

import { Launch } from './views/Launch'
import { Launches } from './views/Launches'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Launches />} />
            <Route path="launch/:id" element={<Launch />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
