import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { specialityData } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [search, setSearch] = useState('')
  const [filterDoc, setFilterDoc] = useState([])

  useEffect(() => {
    const result = doctors.filter((doctor) => {
      const matchesSpeciality = speciality ? doctor.speciality === speciality : true
      const query = search.toLowerCase()
      return matchesSpeciality && (`${doctor.name} ${doctor.speciality}`).toLowerCase().includes(query)
    })
    setFilterDoc(result)
  }, [doctors, speciality, search])

  return (
    <main className='page-frame'>
      <section className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10'>
        <div>
          <p className='eyebrow'>Find your care team</p>
          <h1 className='text-3xl sm:text-4xl font-semibold text-[#183a34] mt-3'>{speciality || 'All doctors'}</h1>
          <p className='text-gray-500 mt-3 max-w-xl'>Thoughtful care from experienced professionals, available when you need it.</p>
        </div>
        <label className='relative w-full md:w-72'>
          <span className='sr-only'>Search doctors</span>
          <input className='input-field pl-11' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search by name or care' />
          <span className='absolute left-4 top-3 text-gray-400'>⌕</span>
        </label>
      </section>

      <div className='flex gap-2 overflow-x-auto pb-3 mb-8'>
        <button onClick={() => navigate('/doctors')} className={`whitespace-nowrap rounded-full px-5 py-3 min-h-[46px] text-base font-semibold ${!speciality ? 'bg-[#0f766e] text-white' : 'bg-white border border-[#dce7e2] text-gray-600'}`}>All care</button>
        {specialityData.map((item) => (
          <button key={item.speciality} onClick={() => navigate(`/doctors/${item.speciality}`)} className={`whitespace-nowrap rounded-full px-5 py-3 min-h-[46px] text-base font-semibold ${speciality === item.speciality ? 'bg-[#0f766e] text-white' : 'bg-white border border-[#dce7e2] text-gray-600'}`}>{item.speciality}</button>
        ))}
      </div>

      <p className='text-sm text-gray-500 mb-4'>{filterDoc.length} clinicians available</p>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
        {filterDoc.map((doctor) => (
          <article key={doctor._id} onClick={() => navigate(`/appointments/${doctor._id}`)} className='doctor-card rounded-2xl overflow-hidden cursor-pointer'>
            <img className='w-full aspect-[1/1.08] object-cover bg-[#e6f4f1]' src={doctor.image} alt={doctor.name} />
            <div className='p-3'>
              <div className='flex items-center gap-2 text-xs font-semibold text-[#0f766e]'><span className='w-2 h-2 rounded-full bg-[#0f766e]' /> Available today</div>
              <h2 className='font-semibold text-base text-[#183a34] mt-2'>{doctor.name}</h2>
              <p className='text-sm text-gray-500 mt-1'>{doctor.speciality}</p>
              <p className='text-xs text-gray-400 mt-3'>{doctor.experience} experience · ${doctor.fees} visit</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Doctors
