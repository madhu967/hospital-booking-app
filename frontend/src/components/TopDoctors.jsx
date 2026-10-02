import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]'>Meet your care team</p>
        <h2 className='text-3xl md:text-4xl font-semibold tracking-[-0.03em]'>Doctors people come back to</h2>
        <p className='section-intro text-center text-sm leading-6 text-gray-500'>Experienced professionals, easy appointments, and care that starts with listening.</p>
        {/* <div className='w-full grid grid-cols-auto [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'> */}
        {/* <div className='grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-2  gap-4 pt-5 gap-y-6 px-3 sm:px-0'> */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-3 pt-5 gap-y-5 px-3 sm:px-0'>


                {doctors.slice(0,10).map((item)=>(
                    <div key={item._id} onClick={()=>{navigate(`/appointments/${item._id}`);scrollTo(0,0)}} className='doctor-card rounded-2xl overflow-hidden cursor-pointer'>
                <img className='w-full aspect-[1/1.08] object-cover bg-[#e6f4f1]' src={item.image} alt={item.name} />
                <div className='p-3'>
                    <div className='flex items-center gap-2 text-xs font-medium text-[#0f766e]'>
                        <p className='w-2 h-2 bg-[#0f766e] rounded-full'></p><p>Available today</p>
                    </div>
                    <p className='text-gray-900 text-md font-semibold mt-2'>{item.name}</p>
                    <p className='text-gray-500 text-sm mt-1'>{item.speciality}</p>
                </div>
               </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='border border-[#b7ded9] text-[#0f766e] px-8 py-3 rounded-full mt-10 text-sm font-semibold hover:bg-[#e6f4f1] transition-colors'>View all doctors</button>
    </div>
  )
}

export default TopDoctors