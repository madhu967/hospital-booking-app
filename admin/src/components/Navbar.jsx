import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const {atoken, setAToken, role} = useContext(AdminContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/')
        atoken && setAToken('')
        atoken && localStorage.removeItem('atoken')
        localStorage.removeItem('role')
    }

  return (
    <div className='flex justify-between items-center px-5 sm:px-10 py-3.5 border-b border-[#dce7e2] bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-sm'>
        <div className='flex items-center gap-3'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <span className='border border-[#b7ded9] bg-[#e6f4f1] px-3 py-1 rounded-full text-[#0f766e] text-xs font-semibold tracking-wide'>
              {atoken ? role : 'Doctor'}
            </span>
        </div>
        <button
          onClick={logout}
          className='bg-[#0f766e] text-white text-sm px-6 py-2 rounded-full font-semibold hover:bg-[#0b5f59] hover:shadow-md transition-all'
        >
          Logout
        </button>
    </div>
  )
}

export default Navbar