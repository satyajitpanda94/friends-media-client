import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'

export default function App() {
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}
