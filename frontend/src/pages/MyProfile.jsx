import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  if (!userData) return null

  const updateProfile = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (!data.success) return toast.error(data.message)
      await loadUserProfileData()
      setIsEdit(false)
      setImage(false)
      toast.success(data.message)
    } catch (error) { toast.error(error.message) }
  }

  return (
    <main className='page-frame max-w-3xl'>
      <div className='mb-8'>
        <p className='eyebrow'>Your profile</p>
        <h1 className='text-4xl font-semibold tracking-[-0.05em] text-[#183a34] mt-3'>A little about you</h1>
      </div>

      <section className='soft-surface p-6 sm:p-8'>
        {/* Avatar */}
        <label className='block w-28 cursor-pointer group'>
          <div className='relative'>
            <img
              className={`w-28 h-28 object-cover rounded-2xl ring-4 ring-[#dce7e2] ${isEdit ? 'opacity-75 group-hover:opacity-60' : ''} transition-opacity`}
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=''
            />
            {isEdit && (
              <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20'>
                <span className='text-white text-xs font-semibold'>Change</span>
              </div>
            )}
          </div>
          {isEdit && <input className='hidden' type='file' onChange={(event) => setImage(event.target.files[0])} />}
        </label>

        {/* Name */}
        {isEdit
          ? <input className='input-field text-2xl font-semibold mt-5 max-w-sm' value={userData.name} onChange={(event) => setUserData((prev) => ({ ...prev, name: event.target.value }))} />
          : <h2 className='text-3xl font-semibold text-[#183a34] mt-5'>{userData.name}</h2>
        }

        {/* Info grid */}
        <div className='grid sm:grid-cols-2 gap-8 border-t border-[#dce7e2] mt-8 pt-8'>
          <div>
            <p className='eyebrow mb-4'>Contact</p>
            <div className='space-y-4'>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>Email</p>
                <p className='text-gray-600 mt-1'>{userData.email}</p>
              </div>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>Phone</p>
                {isEdit
                  ? <input className='input-field mt-1' value={userData.phone} onChange={(event) => setUserData((prev) => ({ ...prev, phone: event.target.value }))} />
                  : <p className='text-gray-600 mt-1'>{userData.phone}</p>
                }
              </div>
            </div>
          </div>
          <div>
            <p className='eyebrow mb-4'>Details</p>
            <div className='space-y-4'>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>Address</p>
                {isEdit
                  ? <textarea className='input-field mt-1' value={userData.address.line1} onChange={(event) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: event.target.value } }))} />
                  : <p className='text-gray-600 mt-1'>{userData.address.line1}<br />{userData.address.line2}</p>
                }
              </div>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>Birthday</p>
                <p className='text-gray-600 mt-1'>{userData.dob}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className='mt-8 flex gap-3'>
          {isEdit
            ? <>
                <button className='primary-button' onClick={updateProfile}>Save changes</button>
                <button className='border border-[#dce7e2] text-gray-500 px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#f4f7f5] transition-colors' onClick={() => { setIsEdit(false); setImage(false) }}>Cancel</button>
              </>
            : <button className='primary-button' onClick={() => setIsEdit(true)}>Edit profile</button>
          }
        </div>
      </section>
    </main>
  )
}

export default MyProfile
