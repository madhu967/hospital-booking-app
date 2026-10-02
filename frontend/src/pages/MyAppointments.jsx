import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState('')

  const loadAppointments = async () => {
    if (!token) return setLoading(false)
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
      if (data.success) setAppointments(data.appointments)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAppointments() }, [token])

  const runAction = async (appointmentId, endpoint, successMessage) => {
    setActionId(appointmentId)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/${endpoint}`, { appointmentId }, { headers: { token } })
      if (!data.success) return toast.error(data.message)
      toast.success(successMessage || data.message)
      await loadAppointments()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setActionId('')
    }
  }

  return (
    <main className='page-frame'>
      <div className='mb-10'>
        <p className='eyebrow'>Your care timeline</p>
        <h1 className='text-3xl sm:text-4xl font-semibold text-[#183a34] mt-3 tracking-[-0.03em]'>My appointments</h1>
        <p className='text-gray-500 mt-2 leading-7'>Keep your upcoming visits and care details in one place.</p>
      </div>

      {loading && (
        <div className='soft-surface p-10 text-center text-gray-400'>
          <div className='w-8 h-8 border-2 border-[#0f766e] border-t-transparent rounded-full animate-spin mx-auto mb-3'></div>
          Loading your appointments…
        </div>
      )}
      {!loading && appointments.length === 0 && (
        <div className='soft-surface p-12 text-center'>
          <p className='text-2xl font-semibold text-[#183a34]'>No appointments yet</p>
          <p className='text-gray-500 mt-2'>Book a visit with one of our trusted doctors.</p>
        </div>
      )}

      <div className='space-y-4'>
        {appointments.map((appointment) => {
          const doctor = appointment.docData
          const busy = actionId === appointment._id
          return (
            <article key={appointment._id} className={`soft-surface p-5 sm:p-6 flex flex-col sm:flex-row gap-5 ${appointment.cancelled ? 'opacity-60' : ''}`}>
              <img className='w-full sm:w-28 aspect-square object-cover rounded-2xl flex-shrink-0' src={doctor.image} alt={doctor.name} />
              <div className='flex-1'>
                <div className='flex items-start justify-between gap-3 flex-wrap'>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 ${appointment.cancelled ? 'bg-red-50 text-red-500' : 'bg-[#e6f4f1] text-[#0f766e]'}`}>
                      {!appointment.cancelled && <span className='w-1.5 h-1.5 bg-[#0f766e] rounded-full'></span>}
                      {appointment.cancelled ? 'Cancelled' : 'Confirmed'}
                    </span>
                    <h2 className='text-xl font-semibold text-[#183a34] mt-3'>{doctor.name}</h2>
                    <p className='text-gray-500'>{doctor.speciality}</p>
                    <p className='text-sm text-gray-400 mt-3 leading-6'>{appointment.slotDate} · {appointment.slotTime}<br />{doctor.address?.line1}{doctor.address?.line2 ? `, ${doctor.address.line2}` : ''}</p>
                  </div>
                  {!appointment.cancelled && (
                    <div className='flex sm:flex-col items-center gap-2 sm:items-end'>
                      <span className='text-sm font-semibold text-[#0f766e] bg-[#e6f4f1] px-4 py-2 rounded-full'>${appointment.amount}</span>
                      <button
                        disabled={busy}
                        onClick={() => runAction(appointment._id, 'cancel-appointment', 'Appointment cancelled')}
                        className='border border-red-200 text-red-500 rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-50 hover:bg-red-50 transition-colors'
                      >
                        {busy ? 'Cancelling…' : 'Cancel'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}

export default MyAppointments
