import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Dashboard = () => {
  const { dashboard, getDashboard } = useContext(AdminContext)
  const { stats, recentAppointments } = dashboard
  useEffect(() => { getDashboard() }, [])

  const cards = [
    ['Doctors', stats.doctors || 0, 'Registered clinicians'],
    ['Patients', stats.users || 0, 'People in care'],
    ['Appointments', stats.appointments || 0, 'All time bookings'],
    ['Active visits', stats.activeAppointments || 0, 'Not cancelled'],
  ]

  return <main className='flex-1 p-5 sm:p-8 max-w-7xl'><div className='mb-8'><p className='admin-eyebrow'>Today at Prescripto</p><h1 className='text-4xl font-semibold mt-2'>Good morning, admin.</h1><p className='text-gray-500 text-lg mt-1'>Here is the pulse of your practice.</p></div><div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'>{cards.map(([label, value, hint]) => <div className='admin-card rounded-2xl p-5' key={label}><p className='text-gray-500'>{label}</p><p className='text-4xl font-semibold text-[#183a34] mt-3'>{value}</p><p className='text-sm text-[#0f766e] mt-2'>{hint}</p></div>)}</div><section className='admin-card rounded-2xl overflow-hidden'><div className='flex items-center justify-between p-5 border-b border-[#dce7e2]'><div><p className='admin-eyebrow'>Live schedule</p><h2 className='text-2xl font-semibold mt-1'>Recent appointments</h2></div><span className='text-sm text-gray-500'>{recentAppointments.length} latest</span></div><div className='overflow-x-auto'><table className='w-full text-left text-sm'><thead className='bg-[#f4f7f5] text-gray-500'><tr><th className='p-4 font-semibold'>Patient</th><th className='p-4 font-semibold'>Doctor</th><th className='p-4 font-semibold'>Date & time</th><th className='p-4 font-semibold'>Status</th></tr></thead><tbody>{recentAppointments.map((appointment) => <tr key={appointment._id} className='border-t border-[#e8efec]'><td className='p-4 font-semibold'>{appointment.userData?.name || 'Patient'}</td><td className='p-4 text-gray-600'>{appointment.docData?.name || 'Doctor'}</td><td className='p-4 text-gray-600'>{appointment.slotDate} · {appointment.slotTime}</td><td className='p-4'><span className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.cancelled ? 'bg-red-50 text-red-500' : 'bg-[#e6f4f1] text-[#0f766e]'}`}>{appointment.cancelled ? 'Cancelled' : 'Confirmed'}</span></td></tr>)}</tbody></table>{recentAppointments.length === 0 && <p className='p-8 text-center text-gray-500'>No appointments have been booked yet.</p>}</div></section></main>
}

export default Dashboard
