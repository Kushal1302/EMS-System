import React, { useState } from 'react'
import VerticalNavbar from './Components/Admin/VerticalNavbar'
import AdminHome from './Components/Admin/AdminHome'
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute'
import {Routes , Route} from 'react-router-dom'
import AllEmployee from './Components/Admin/AllEmployee'

const App = () => {
  const [open , setOpen] = useState(false)
  return (
    <div>
      <Routes>
        <Route element = {<AdminProtectedRoute open={open} setOpen={setOpen}/>}>
          <Route path="/" element={<AdminHome open={open}/>}/>
          <Route path="/employee" element={<AllEmployee open={open}/>}/>
          <Route path="/leaves" element={<>All Leaves</>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App

