import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { AuthContext } from './context/authContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Profile from './pages/profile/Profile'
import Photo from './pages/photo/Photo'

export default function App() {
  const { user } = useContext(AuthContext)
  const queryClient = new QueryClient()

  return (<div>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Login />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/photo/:id' element={<Photo />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </div>
  )
}
