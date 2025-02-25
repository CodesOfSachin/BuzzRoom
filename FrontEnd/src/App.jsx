import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Chat from './pages/chat'

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App