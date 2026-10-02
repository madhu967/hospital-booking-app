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
import Users from './pages/Admin/Users'
import DoctorDashboard from './pages/Doctor/Dashboard'
import DoctorAppointments from './pages/Doctor/Appointments'
import { Route,Routes } from 'react-router-dom'

const App = () => {

  const {atoken,role}=useContext(AdminContext)
  return atoken ? (
    <div className='min-h-screen bg-[#f4f7f5]'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<></>}></Route>
          {role === 'Doctor' ? <>
            <Route path='/admin-dashboard' element={<DoctorDashboard></DoctorDashboard>}></Route>
            <Route path='/doctor-appointments' element={<DoctorAppointments></DoctorAppointments>}></Route>
          </> : <>
            <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path='/all-apointments' element={<AllAppointments></AllAppointments>}></Route>
            <Route path='/all-users' element={<Users></Users>}></Route>
            <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}></Route>
            <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}></Route>
          </>}
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