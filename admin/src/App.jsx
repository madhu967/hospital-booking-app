import React from 'react'
import Login from './pages/Login'
import { ToastContainer,toast } from 'react-toastify'
import { useContext } from 'react'

import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { Route,Routes } from 'react-router-dom'

const App = () => {

  const {atoken}=useContext(AdminContext)
  return atoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/all-apointments' element={<AllAppointments></AllAppointments>}></Route>
          <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}></Route>
          <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}></Route>
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login></Login>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App