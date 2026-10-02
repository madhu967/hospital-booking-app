import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)
  return <main className='page-frame'><div className='mb-10'><p className='eyebrow'>Your care timeline</p><h1 className='text-4xl font-semibold tracking-[-.05em] text-[#183a34] mt-3'>My appointments</h1><p className='text-gray-500 mt-2'>Keep your upcoming visits and care details in one place.</p></div><div className='space-y-4'>{doctors.slice(0, 3).map((doctor) => <article key={doctor._id} className='soft-surface rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5'><img className='w-full sm:w-28 aspect-square object-cover rounded-xl' src={doctor.image} alt={doctor.name} /><div className='flex-1'><p className='text-xs font-bold uppercase tracking-wider text-[#0f766e]'>Upcoming visit</p><h2 className='text-xl font-semibold text-[#183a34] mt-2'>{doctor.name}</h2><p className='text-gray-500'>{doctor.speciality}</p><p className='text-sm text-gray-500 mt-4'>25 July 2024 · 8:30 PM<br />54709 Willms Station, Washington</p></div><div className='flex sm:flex-col justify-end gap-2'><button className='primary-button text-sm'>Pay online</button><button className='border border-red-200 text-red-500 rounded-full px-5 py-3 text-sm'>Cancel</button></div></article>)}</div></main>
}

export default MyAppointments
