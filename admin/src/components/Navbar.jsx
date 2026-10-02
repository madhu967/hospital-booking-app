import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const {atoken,setAToken,role}=useContext(AdminContext);

    const navigate =useNavigate();

    const logout=()=>{
        navigate('/')
        atoken && setAToken('')
        atoken && localStorage.removeItem('atoken')
        localStorage.removeItem('role')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-4 border-b border-[#dce7e2] bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm-w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-[#b7ded9] text-[#0f766e] text-sm'>{atoken ? role : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-[#0f766e] text-white text-sm px-7 py-2.5 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar