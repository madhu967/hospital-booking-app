import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900' id='speciality'>
      <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]'>Start with what you need</p>
      <h2 className='text-3xl md:text-4xl font-semibold tracking-[-0.03em]'>Find the right specialist</h2>
      <p className='section-intro text-center text-base leading-7 text-gray-500'>Browse trusted care teams by specialty and take the next step with confidence.</p>
      <div className='flex sm:justify-center gap-4 pt-6 w-full overflow-x-auto px-2 pb-4'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='speciality-tile flex flex-col items-center justify-center gap-3 text-sm font-medium cursor-pointer flex-shrink-0 w-40 h-36 shadow-sm'
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <span className='flex items-center justify-center w-16 h-16 rounded-2xl bg-[#e6f4f1] overflow-hidden ring-2 ring-[#c8e6e0] ring-offset-1 transition-all duration-300'>
              <img className='w-full h-full object-cover' src={item.image} alt="" />
            </span>
            <p className='text-center leading-tight text-xs font-semibold text-[#183a34]'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu