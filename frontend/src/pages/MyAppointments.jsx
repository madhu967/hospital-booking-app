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
      <div className='mb-8'>
        <p className='eyebrow'>Your care timeline</p>
        <h1 className='text-3xl font-semibold text-[#183a34] mt-3'>My appointments</h1>
        <p className='text-gray-500 mt-2'>Keep your upcoming visits and care details in one place.</p>
      </div>

      {loading && <div className='soft-surface rounded-2xl p-8 text-gray-500'>Loading your appointments...</div>}
      {!loading && appointments.length === 0 && <div className='soft-surface rounded-2xl p-8 text-gray-500'>You do not have any appointments yet.</div>}
      <div className='space-y-4'>
        {appointments.map((appointment) => {
          const doctor = appointment.docData
          const busy = actionId === appointment._id
          return (
            <article key={appointment._id} className={`soft-surface rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 ${appointment.cancelled ? 'opacity-60' : ''}`}>
              <img className='w-full sm:w-28 aspect-square object-cover rounded-xl' src={doctor.image} alt={doctor.name} />
              <div className='flex-1'>
                <p className={`text-xs font-bold uppercase tracking-wider ${appointment.cancelled ? 'text-red-500' : 'text-[#0f766e]'}`}>{appointment.cancelled ? 'Cancelled' : 'Appointment'}</p>
                <h2 className='text-xl font-semibold text-[#183a34] mt-2'>{doctor.name}</h2>
                <p className='text-gray-500'>{doctor.speciality}</p>
                <p className='text-sm text-gray-500 mt-4'>{appointment.slotDate} · {appointment.slotTime}<br />{doctor.address?.line1}, {doctor.address?.line2}</p>
              </div>
              {!appointment.cancelled && <div className='flex sm:flex-col justify-end gap-2'>
                <span className='text-sm text-center font-semibold text-[#0f766e] px-4 py-3'>Pay at visit · ${appointment.amount}</span>
                <button disabled={busy} onClick={() => runAction(appointment._id, 'cancel-appointment', 'Appointment cancelled')} className='border border-red-200 text-red-500 rounded-full px-5 py-3 text-sm disabled:opacity-50'>Cancel appointment</button>
              </div>}
            </article>
          )
        })}
      </div>
    </main>
  )
}

export default MyAppointments
