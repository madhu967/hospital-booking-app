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
    <div className='flex items-center justify-between text-sm py-5 mb-2 border-b border-b-[#dce7e2]'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-center gap-7 font-semibold text-[#52615d]'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-[#0f766e] w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-[#0f766e] w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>OUR STORY</li>
                <hr className='border-none outline-none h-0.5 bg-[#0f766e] w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-[#0f766e] w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            <a className='hidden md:block border border-[#0f766e] rounded-full px-4 py-2 text-sm font-semibold text-[#0f766e] whitespace-nowrap hover:bg-[#e6f4f1] transition-colors' href='https://hospital-booking-app-jpza.vercel.app/' target='_blank' rel='noreferrer'>Admin / Doctor Login</a>
            {
                token && userData ?
                <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={userData.image} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer' >My Profile</p>
                            <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>:
                <button onClick={()=>navigate('/login')} className='primary-button hidden md:block'>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* Mobile menu  */}
            <div className={` ${showMenu? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <a onClick={()=>setShowMenu(false)} href='https://hospital-booking-app-jpza.vercel.app/' target='_blank' rel='noreferrer' className='border border-[#0f766e] px-4 py-2 mb-3 rounded-full text-[#0f766e]'>ADMIN / DOCTOR LOGIN ↗</a>
                    <NavLink  onClick={()=>setShowMenu(false)} to={'/'}> <p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to={'/doctors'}> <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to={'/about'}> <p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to={'/contact'}> <p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar