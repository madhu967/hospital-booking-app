import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';

const DoctorsList = () => {

  const {doctors, getAllDoctors, atoken, changeAvailabilty} = useContext(AdminContext);

  useEffect(() => {
    if(atoken){
      getAllDoctors()
    }
  }, [atoken])

  return (
    <div className='m-5'>
      <div className='mb-6'>
        <p className='admin-eyebrow'>Doctor Management</p>
        <h1 className='text-3xl font-semibold text-[#183a34] mt-1'>All Doctors</h1>
        <p className='text-gray-500 mt-1'>{doctors.length} registered clinicians</p>
      </div>
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {doctors.map((item, index) => (
          <div
            className='admin-card overflow-hidden cursor-pointer group'
            key={index}
          >
            <div className='overflow-hidden bg-[#e6f4f1]'>
              <img
                className='w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500'
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className='p-4'>
              <p className='text-[#183a34] font-semibold text-base leading-tight'>{item.name}</p>
              <p className='text-gray-500 text-sm mt-1'>{item.speciality}</p>
              <label className='mt-3 flex items-center gap-2 cursor-pointer group/toggle'>
                <div className={`relative w-9 h-5 rounded-full transition-colors ${item.available ? 'bg-[#0f766e]' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.available ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <input onChange={() => changeAvailabilty(item._id)} type="checkbox" checked={item.available} className='hidden' />
                <span className={`text-xs font-semibold ${item.available ? 'text-[#0f766e]' : 'text-gray-400'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList