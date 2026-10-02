import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate=useNavigate();

    const [showMenu,setShowMenu]=useState(false)

    const {token,setToken,userData}=useContext(AppContext)

    const logout =()=>{
        setToken(false)
        localStorage.removeItem('token')
    }
    

  return (
    <div className='flex items-center justify-between py-4 mb-2 border-b border-b-[#dce7e2] sticky top-0 z-30 bg-[#f4f7f5]/90 backdrop-blur-md'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-center gap-1 font-semibold text-[#52615d] text-sm'>
            {[['/', 'HOME'], ['/doctors', 'DOCTORS'], ['/about', 'OUR STORY'], ['/contact', 'CONTACT']].map(([path, label]) => (
              <NavLink key={path} to={path} className={({isActive}) => `relative px-4 py-2 rounded-full transition-colors ${isActive ? 'text-[#0f766e] bg-[#e6f4f1]' : 'hover:text-[#0f766e] hover:bg-[#f0f9f7]'}`}>
                <li>{label}</li>
              </NavLink>
            ))}
        </ul>
        <div className='flex items-center gap-3'>
            <a className='hidden md:block border border-[#0f766e] rounded-full px-4 py-2 text-sm font-semibold text-[#0f766e] whitespace-nowrap hover:bg-[#e6f4f1] transition-colors' href='https://hospital-booking-app-jpza.vercel.app/' target='_blank' rel='noreferrer'>Admin / Doctor Login</a>
            {
                token && userData ?
                <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-9 h-9 rounded-full object-cover ring-2 ring-[#dce7e2] group-hover:ring-[#0f766e] transition-all' src={userData.image} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-sm font-medium z-20 hidden group-hover:block'>
                        <div className='min-w-52 bg-white rounded-2xl flex flex-col gap-1 p-3 shadow-xl shadow-[#183a34]/10 border border-[#dce7e2]'>
                            <p onClick={()=>navigate('/my-profile')} className='px-4 py-2.5 rounded-xl hover:bg-[#f0f9f7] hover:text-[#0f766e] cursor-pointer transition-colors' >My Profile</p>
                            <p onClick={()=>navigate('/my-appointments')} className='px-4 py-2.5 rounded-xl hover:bg-[#f0f9f7] hover:text-[#0f766e] cursor-pointer transition-colors'>My Appointments</p>
                            <div className='border-t border-[#dce7e2] mt-1 pt-1'>
                              <p onClick={logout} className='px-4 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 cursor-pointer transition-colors'>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>:
                <button onClick={()=>navigate('/login')} className='primary-button hidden md:block'>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
            {/* Mobile menu  */}
            <div className={` ${showMenu? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6 border-b border-[#dce7e2]'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7 cursor-pointer' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-stretch gap-1 mt-4 px-4 text-base font-medium'>
                    <a onClick={()=>setShowMenu(false)} href='https://hospital-booking-app-jpza.vercel.app/' target='_blank' rel='noreferrer' className='flex items-center justify-center border border-[#0f766e] px-4 py-3 mb-2 rounded-full text-[#0f766e] text-sm font-semibold'>ADMIN / DOCTOR LOGIN ↗</a>
                    {[['/', 'HOME'], ['/doctors', 'ALL DOCTORS'], ['/about', 'ABOUT'], ['/contact', 'CONTACT']].map(([path, label]) => (
                      <NavLink key={path} onClick={()=>setShowMenu(false)} to={path}>
                        <p className='px-4 py-3 rounded-xl transition-colors hover:bg-[#f0f9f7] hover:text-[#0f766e]'>{label}</p>
                      </NavLink>
                    ))}
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar