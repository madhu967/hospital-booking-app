import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const Appointments = () => {
  const { backendUrl, atoken } = useContext(AdminContext)
  const [appointments, setAppointments] = useState([])
  useEffect(() => { axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { atoken } }).then(({ data }) => data.success ? setAppointments(data.appointments) : toast.error(data.message)).catch((error) => toast.error(error.response?.data?.message || error.message)) }, [atoken])
  return <main className='flex-1 p-5 sm:p-8 max-w-7xl'><div className='mb-8'><p className='admin-eyebrow'>Doctor workspace</p><h1 className='text-4xl font-semibold mt-2'>My appointments</h1><p className='text-gray-500 text-lg mt-1'>Patient details and your upcoming schedule.</p></div><section className='admin-card rounded-2xl overflow-hidden'><div className='overflow-x-auto'><table className='w-full min-w-[720px] text-left text-sm'><thead className='bg-[#f4f7f5] text-gray-500'><tr><th className='p-4'>Patient</th><th className='p-4'>Contact</th><th className='p-4'>Visit</th><th className='p-4'>Fee</th><th className='p-4'>Status</th></tr></thead><tbody>{appointments.map((appointment) => <tr key={appointment._id} className='border-t border-[#e8efec]'><td className='p-4 font-semibold'>{appointment.userData?.name || 'Patient'}</td><td className='p-4 text-gray-500'>{appointment.userData?.email}<br />{appointment.userData?.phone}</td><td className='p-4 text-gray-500'>{appointment.slotDate}<br />{appointment.slotTime}</td><td className='p-4 text-gray-500'>${appointment.amount}</td><td className='p-4'><span className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.cancelled ? 'bg-red-50 text-red-500' : 'bg-[#e6f4f1] text-[#0f766e]'}`}>{appointment.cancelled ? 'Cancelled' : 'Confirmed'}</span></td></tr>)}</tbody></table>{appointments.length === 0 && <p className='p-8 text-center text-gray-500'>No appointments found.</p>}</div></section></main>
}

export default Appointments
