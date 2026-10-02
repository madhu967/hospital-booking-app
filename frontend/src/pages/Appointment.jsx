import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, backendUrl, token } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  useEffect(() => {
    setDocInfo(doctors.find((doctor) => doctor._id === docId))
  }, [doctors, docId])

  useEffect(() => {
    const slots = []
    const today = new Date()

    for (let day = 0; day < 7; day += 1) {
      const date = new Date(today)
      date.setDate(today.getDate() + day)
      date.setHours(day === 0 ? Math.max(today.getHours() + 1, 10) : 10, 0, 0, 0)
      const end = new Date(date)
      end.setHours(20, 30, 0, 0)
      const times = []

      while (date < end) {
        times.push({ datetime: new Date(date), time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
        date.setMinutes(date.getMinutes() + 30)
      }
      slots.push(times)
    }

    setDocSlots(slots)
  }, [docInfo])

  const confirmAppointment = async () => {
    if (!token) {
      toast.error('Please sign in before booking an appointment')
      navigate('/login')
      return
    }
    if (!slotTime || !docSlots[slotIndex]?.[0]) {
      toast.error('Please choose a date and time')
      return
    }

    setIsBooking(true)
    try {
      const slotDate = docSlots[slotIndex][0].datetime.toISOString().split('T')[0]
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } },
      )

      if (!data.success) {
        toast.error(data.message)
        return
      }

      toast.success(data.message)
      navigate('/my-appointments')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsBooking(false)
    }
  }

  if (!docInfo) return null

  return (
    <main className='page-frame'>
      <div className='grid lg:grid-cols-[320px_1fr] gap-8 items-start'>
        {/* Doctor card */}
        <section className='soft-surface p-3'>
          <img className='w-full aspect-[4/4.8] object-cover rounded-xl' src={docInfo.image} alt={docInfo.name} />
          <div className='p-5'>
            <div className='flex items-center gap-1.5 text-xs font-semibold text-[#0f766e] bg-[#e6f4f1] w-fit px-3 py-1.5 rounded-full mb-3'>
              <span className='w-1.5 h-1.5 bg-[#0f766e] rounded-full animate-pulse'></span>
              Verified clinician
            </div>
            <h1 className='text-2xl font-semibold text-[#183a34] leading-tight'>{docInfo.name}</h1>
            <p className='text-gray-500 mt-1'>{docInfo.speciality}</p>
            <p className='text-sm text-gray-400 mt-3 border-t border-[#e8efec] pt-3'>{docInfo.degree} · {docInfo.experience}</p>
          </div>
        </section>

        {/* Booking section */}
        <section>
          <p className='eyebrow'>Book a visit</p>
          <h2 className='text-3xl font-semibold text-[#183a34] mt-3 tracking-[-0.03em]'>A good next step starts here.</h2>
          <p className='text-gray-500 leading-7 mt-4 max-w-2xl'>{docInfo.about}</p>

          <div className='flex flex-wrap gap-3 mt-6'>
            <span className='bg-[#e6f4f1] text-[#0f766e] rounded-full px-5 py-2 text-sm font-semibold'>${docInfo.fees} consultation</span>
            <span className='bg-white border border-[#dce7e2] text-gray-500 rounded-full px-5 py-2 text-sm'>In-person visit</span>
          </div>

          {/* Slot picker */}
          <div className='soft-surface p-6 mt-10'>
            <p className='font-semibold text-[#183a34] text-base mb-4'>Choose a day</p>
            <div className='flex gap-2.5 overflow-x-auto pb-2'>
              {docSlots.map((day, index) => (
                <button
                  key={day[0]?.datetime.toISOString() || index}
                  onClick={() => { setSlotIndex(index); setSlotTime('') }}
                  className={`min-w-[58px] rounded-2xl py-3.5 text-sm font-semibold transition-all ${
                    slotIndex === index
                      ? 'bg-[#0f766e] text-white shadow-md shadow-[#0f766e]/20'
                      : 'bg-[#f4f7f5] text-gray-500 hover:bg-[#e6f4f1] hover:text-[#0f766e]'
                  }`}
                >
                  <span className='block text-xs mb-0.5'>{day[0] && days[day[0].datetime.getDay()]}</span>
                  <span className='block text-base font-bold'>{day[0] && day[0].datetime.getDate()}</span>
                </button>
              ))}
            </div>

            <p className='font-semibold text-[#183a34] text-base mt-7 mb-4'>Choose a time</p>
            <div className='flex flex-wrap gap-2.5'>
              {docSlots[slotIndex]?.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSlotTime(slot.time)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    slotTime === slot.time
                      ? 'bg-[#0f766e] text-white shadow-sm'
                      : 'border border-[#dce7e2] text-gray-500 hover:border-[#0f766e] hover:text-[#0f766e]'
                  }`}
                >
                  {slot.time.toLowerCase()}
                </button>
              ))}
            </div>

            <button
              className='primary-button mt-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              disabled={isBooking}
              onClick={confirmAppointment}
            >
              {isBooking ? 'Confirming…' : 'Confirm appointment'}
            </button>
          </div>
        </section>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </main>
  )
}

export default Appointment
