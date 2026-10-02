import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-20 text-gray-900 md:mx-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]'>Meet your care team</p>
        <h2 className='text-3xl md:text-4xl font-semibold tracking-[-0.03em]'>Doctors people come back to</h2>
        <p className='section-intro text-center text-base leading-7 text-gray-500'>Experienced professionals, easy appointments, and care that starts with listening.</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-4 pt-6 px-3 sm:px-0 w-full'>

                {doctors.slice(0,10).map((item)=>(
                    <div key={item._id} onClick={()=>{navigate(`/appointments/${item._id}`);scrollTo(0,0)}} className='doctor-card cursor-pointer group'>
                <img className='w-full aspect-[1/1.08] object-cover bg-[#e6f4f1] group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                <div className='p-4'>
                    <div className='flex items-center gap-1.5 text-xs font-semibold text-[#0f766e] bg-[#e6f4f1] w-fit px-2.5 py-1 rounded-full'>
                        <span className='w-1.5 h-1.5 bg-[#0f766e] rounded-full animate-pulse'></span>Available today
                    </div>
                    <p className='text-[#183a34] text-base font-semibold mt-3 leading-tight'>{item.name}</p>
                    <p className='text-gray-500 text-sm mt-1'>{item.speciality}</p>
                </div>
               </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='border border-[#b7ded9] text-[#0f766e] px-10 py-3 rounded-full mt-10 text-sm font-semibold hover:bg-[#e6f4f1] hover:border-[#0f766e] transition-all'>View all doctors</button>
    </div>
  )
}

export default TopDoctors