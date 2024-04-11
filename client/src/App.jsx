import React, { useEffect, useState } from 'react'
import VerticalNavbar from './Components/Admin/VerticalNavbar'
import AdminHome from './Components/Admin/AdminHome'
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute'
import {Routes , Route} from 'react-router-dom'
import AllEmployee from './Components/Admin/AllEmployee'
import Login from './Components/Login'
import {useNavigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const [open , setOpen] = useState(false)
  const navigate = useNavigate()
  const {user , token} = JSON.parse(localStorage.getItem("jwt")) ?? {}
  useEffect(() => {
    if(token && user?.role === "admin") navigate('/adminHome')
  })
  return (
    <div>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route element = {<AdminProtectedRoute open={open} setOpen={setOpen}/>}>
          <Route path="/adminHome" element={<AdminHome open={open}/>}/>
          <Route path="/allEmployee" element={<AllEmployee open={open}/>}/>
          <Route path="/leaves" element={<>All Leaves</>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App

