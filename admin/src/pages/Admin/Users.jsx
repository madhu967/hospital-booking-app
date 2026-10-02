import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Users = () => {
  const { users, getAllUsers } = useContext(AdminContext)
  useEffect(() => { getAllUsers() }, [])
  return <main className='flex-1 p-5 sm:p-8 max-w-7xl'><div className='mb-8'><p className='admin-eyebrow'>Patient directory</p><h1 className='text-4xl font-semibold mt-2'>All patients</h1><p className='text-gray-500 text-lg mt-1'>People who have joined your care network.</p></div><section className='admin-card rounded-2xl overflow-hidden'><div className='p-5 border-b border-[#dce7e2] text-sm text-gray-500'>{users.length} registered patients</div><div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3 p-4'>{users.map((user) => <article key={user._id} className='border border-[#e8efec] rounded-xl p-4 flex items-center gap-3'><img className='w-12 h-12 rounded-full object-cover bg-[#e6f4f1]' src={user.image} alt='' /><div><p className='font-semibold text-[#183a34]'>{user.name}</p><p className='text-sm text-gray-500'>{user.email}</p><p className='text-xs text-gray-400 mt-1'>{user.phone || 'Phone not added'}</p></div></article>)}</div>{users.length === 0 && <p className='p-8 text-center text-gray-500'>No patients found.</p>}</section></main>
}

export default Users
