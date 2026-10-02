import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='border-t border-[#dce7e2] pt-10 mt-16'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

            {/* -----Left section----- */}
            <div>
               <img className='mb-5 w-40' src={assets.logo} alt="" />
                             <p className='w-full md:w-2/3 text-gray-600 leading-6'>A calmer way to find trusted care, manage appointments, and stay close to the people looking after your health.
                </p>
            </div>
            {/* -----center section----- */}
            <div>
                <p className='eyebrow mb-5'>Explore</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/* -----right section----- */}
            <div>
                <p className='eyebrow mb-5'>Get in touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>ijjimadhu@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* ---copyright--- */}
        <div>
              <hr />
              <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto.All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer