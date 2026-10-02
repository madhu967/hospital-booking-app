import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='landing-cta flex rounded-3xl px-6 sm:px-10 md:px-14 my-16 md:mx-10'>
        {/*----left---*/}
        <div className='relative z-10 flex-1 py-10 sm:py-12 md:py-16 lg:pl-5'>
            <p className='text-white/70 text-xs font-semibold uppercase tracking-widest mb-4'>Ready to get started?</p>
            <div className='text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight'>
                <p>Book Appointment</p>
                <p className='mt-2'>With 100+ Trusted Doctors</p>
            </div>
            <button
              onClick={() => { navigate('/login'); scrollTo(0, 0) }}
              className='bg-white text-sm text-[#0f766e] font-semibold px-8 py-3 rounded-full mt-8 hover:shadow-lg hover:scale-105 transition-all duration-300'
            >
              Create account
            </button>
        </div>
        {/*----right---*/}
        <div className='hidden md:flex md:w-1/2 lg:w-[320px] items-end justify-end'>
            <img className='w-full max-w-[300px] max-h-[230px] object-contain object-bottom drop-shadow-xl' src={assets.appointment_img} alt="Doctor helping a patient book a visit" />
        </div>
    </div>
  )
}

export default Banner
