import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {atoken, role} = useContext(AdminContext)

  const linkClass = ({isActive}) =>
    `flex items-center gap-3 py-3 px-4 md:px-8 md:min-w-64 cursor-pointer rounded-xl mx-2 transition-all text-sm font-semibold ${
      isActive
        ? 'bg-[#e6f4f1] text-[#0f766e] shadow-sm'
        : 'text-[#52615d] hover:bg-[#f0f9f7] hover:text-[#0f766e]'
    }`

  return (
    <div className='min-h-screen bg-white border-r border-[#dce7e2] pt-4'>
      {atoken && role === 'Doctor' ? (
        <ul className='flex flex-col gap-1 mt-2'>
          <NavLink className={linkClass} to={'/admin-dashboard'}>
            <img className='w-5 opacity-70' src={assets.home_icon} alt="" />
            <p>My Dashboard</p>
          </NavLink>
          <NavLink className={linkClass} to={'/doctor-appointments'}>
            <img className='w-5 opacity-70' src={assets.appointment_icon} alt="" />
            <p>My Appointments</p>
          </NavLink>
        </ul>
      ) : atoken && (
        <ul className='flex flex-col gap-1 mt-2'>
          <NavLink className={linkClass} to={'/admin-dashboard'}>
            <img className='w-5 opacity-70' src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink className={linkClass} to={'/all-apointments'}>
            <img className='w-5 opacity-70' src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink className={linkClass} to={'/add-doctor'}>
            <img className='w-5 opacity-70' src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink className={linkClass} to={'/doctor-list'}>
            <img className='w-5 opacity-70' src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
          <NavLink className={linkClass} to={'/all-users'}>
            <img className='w-5 opacity-70' src={assets.people_icon} alt="" />
            <p>Patients</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar