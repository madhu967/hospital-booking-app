import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
        <div className='flex flex-col items-center gap-3 py-12 text-gray-900' id='speciality'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]'>Start with what you need</p>
        <h2 className='text-2xl md:text-3xl font-semibold'>Find the right specialist</h2>
        <p className='section-intro text-center text-sm leading-6 text-gray-500'>Browse trusted care teams by specialty and take the next step with confidence.</p>
        <div className='flex sm:justify-center gap-3 pt-5 w-full overflow-x-auto px-2 pb-3' >
        {specialityData.map((item,index)=>(
          <Link onClick={()=>scrollTo(0,0)} className='speciality-tile flex flex-col items-center justify-center gap-2 text-sm font-medium cursor-pointer flex-shrink-0 rounded-xl w-36 h-32' key={index} to={`/doctors/${item.speciality}`}>
            <span className='flex items-center justify-center w-16 h-16 rounded-full bg-[#e6f4f1] overflow-hidden'><img className='w-full h-full object-cover' src={item.image} alt="" /></span>
            <p className='text-center leading-tight'>{item.speciality}</p>
            </Link>
        ))}
       </div>
    </div>
  )
}

export default SpecialityMenu