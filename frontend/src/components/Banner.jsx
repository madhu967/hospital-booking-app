import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='landing-cta flex rounded-lg px-5 sm:px-8 md:px-10 my-12 md:mx-10'>
        {/*----left---*/}
        <div className='relative z-10 flex-1 py-7 sm:py-8 md:py-12 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl font-semibold text-white'>
                <p>Book Appointment</p>
                <p className='mt-4'>With 100+ Trusted Doctors</p>           
            </div>
            <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white text-sm text-gray-600 px-6 py-2.5 rounded-full mt-5 hover:scale-105 transition-all'>Create account</button>
        </div>
        {/*----right---*/}
        <div className='hidden md:flex md:w-1/2 lg:w-[320px] items-end justify-end'>
            <img className='w-full max-w-[300px] max-h-[230px] object-contain object-bottom' src={assets.appointment_img} alt="Doctor helping a patient book a visit" />
        </div>
    </div>
  )
}

export default Banner
