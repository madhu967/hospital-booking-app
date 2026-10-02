import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

      const {atoken,role}=useContext(AdminContext)
  return (
      <div className='min-h-screen bg-white border-r border-[#dce7e2]'>
       {
        atoken && role === 'Doctor' ? <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/admin-dashboard'}>
                  <img src={assets.home_icon} alt="" />
                  <p>My dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/doctor-appointments'}>
                  <img src={assets.appointment_icon} alt="" />
                  <p>My appointments</p>
            </NavLink>
        </ul> : atoken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/admin-dashboard'}>
                  <img src={assets.home_icon} alt="" />
                  <p>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/all-apointments'}>
                  <img src={assets.appointment_icon} alt="" />
                  <p>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/add-doctor'}>
                  <img src={assets.add_icon} alt="" />
                  <p>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/doctor-list'}>
                  <img src={assets.people_icon} alt="" />
                  <p>Doctor List</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#e6f4f1] border-r-4 border-[#0f766e] text-[#0f766e]':''}`} to={'/all-users'}>
                  <img src={assets.people_icon} alt="" />
                  <p>Patients</p>
            </NavLink>
        </ul>
       }
    </div>
  )
}

export default Sidebar