import React, { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import VerticalNavbar from './VerticalNavbar'
import {useNavigate} from 'react-router-dom'

const AdminProtectedRoute = ({open , setOpen}) => {
  const navigate = useNavigate()
  useEffect(() => {
    const {user , token } = JSON.parse(localStorage.getItem('jwt'))  ?? {}
    if(!token || !user) return navigate('/')
  })
  return (
    <>
    <VerticalNavbar open={open} setOpen={setOpen}/>
    <Outlet/>
    </>
    
  )
}

export default AdminProtectedRoute
