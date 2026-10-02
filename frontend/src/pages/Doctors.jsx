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
          <h1 className='text-3xl sm:text-4xl font-semibold text-[#183a34] mt-3 tracking-[-0.03em]'>{speciality || 'All doctors'}</h1>
          <p className='text-gray-500 mt-3 max-w-xl leading-7'>Thoughtful care from experienced professionals, available when you need it.</p>
        </div>
        <label className='relative w-full md:w-72'>
          <span className='sr-only'>Search doctors</span>
          <input className='input-field pl-10' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search by name or specialty' />
          <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg'>⌕</span>
        </label>
      </section>

      {/* Specialty filter pills */}
      <div className='flex gap-2 overflow-x-auto pb-3 mb-8'>
        <button
          onClick={() => navigate('/doctors')}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${!speciality ? 'bg-[#0f766e] text-white shadow-sm' : 'bg-white border border-[#dce7e2] text-gray-600 hover:border-[#0f766e] hover:text-[#0f766e]'}`}
        >
          All care
        </button>
        {specialityData.map((item) => (
          <button
            key={item.speciality}
            onClick={() => navigate(`/doctors/${item.speciality}`)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${speciality === item.speciality ? 'bg-[#0f766e] text-white shadow-sm' : 'bg-white border border-[#dce7e2] text-gray-600 hover:border-[#0f766e] hover:text-[#0f766e]'}`}
          >
            {item.speciality}
          </button>
        ))}
      </div>

      <p className='text-sm text-gray-500 mb-5 font-semibold'>{filterDoc.length} clinicians available</p>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
        {filterDoc.map((doctor) => (
          <article key={doctor._id} onClick={() => navigate(`/appointments/${doctor._id}`)} className='doctor-card cursor-pointer group'>
            <img className='w-full aspect-[1/1.08] object-cover bg-[#e6f4f1] group-hover:scale-105 transition-transform duration-500' src={doctor.image} alt={doctor.name} />
            <div className='p-4'>
              <div className='flex items-center gap-1.5 text-xs font-semibold text-[#0f766e] bg-[#e6f4f1] w-fit px-2.5 py-1 rounded-full'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#0f766e] animate-pulse' /> Available today
              </div>
              <h2 className='font-semibold text-base text-[#183a34] mt-3 leading-tight'>{doctor.name}</h2>
              <p className='text-sm text-gray-500 mt-1'>{doctor.speciality}</p>
              <p className='text-xs text-gray-400 mt-2'>{doctor.experience} experience · ${doctor.fees} visit</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Doctors
