import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const related = doctors.filter((doctor) => doctor.speciality === speciality && doctor._id !== docId).slice(0, 4)
  return <section className='mt-20'><div className='flex items-end justify-between mb-6'><div><p className='eyebrow'>You may also like</p><h2 className='text-2xl font-semibold text-[#183a34] mt-2'>More {speciality} care</h2></div><button onClick={() => navigate(`/doctors/${speciality}`)} className='text-sm font-semibold text-[#0f766e]'>View all ↗</button></div><div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>{related.map((doctor) => <article key={doctor._id} onClick={() => navigate(`/appointments/${doctor._id}`)} className='doctor-card rounded-2xl overflow-hidden cursor-pointer'><img className='w-full aspect-square object-cover' src={doctor.image} alt={doctor.name} /><div className='p-3'><p className='font-semibold text-[#183a34] text-sm'>{doctor.name}</p><p className='text-xs text-gray-500 mt-1'>{doctor.experience} experience</p></div></article>)}</div></section>
}

export default RelatedDoctors
