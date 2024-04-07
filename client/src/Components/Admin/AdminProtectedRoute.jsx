import React from 'react'
import {Outlet} from 'react-router-dom'
import VerticalNavbar from './VerticalNavbar'

const AdminProtectedRoute = ({open , setOpen}) => {
  return (
    <>
    <VerticalNavbar open={open} setOpen={setOpen}/>
    <Outlet/>
    </>
    
  )
}

export default AdminProtectedRoute
