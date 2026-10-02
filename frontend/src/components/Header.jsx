import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='hero-panel flex flex-col md:flex-row flex-wrap rounded-lg px-5 md:px-8 lg:px-14'>
        {/* Left side  */}
        <div className='hero-copy md:w-1/2 flex flex-col items-start justify-center gap-3 py-8 m-auto md:py-20 md:mb-[-20px]'>
            <p className='text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-[.95]'>
                Book Appointment <br /><span className='text-white'>With Trusted Doctors</span>
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="Patients supported by Prescripto" />
                <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.
                    
                </p>
            </div>
            <a className='flex items-center gap-2 bg-white px-6 py-2.5 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">
                Book Appointment
                <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>

        </div>
        {/* right side  */}
        <div className='hero-image md:w-1/2 min-h-[250px] md:min-h-[330px] flex items-end justify-center relative'>
            <img className='w-full max-w-[500px] max-h-[360px] object-contain object-bottom' src={assets.header_img} alt="Care team ready to help" />
        </div>
    </div>
  )
}

export default Header