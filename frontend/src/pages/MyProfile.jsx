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
    try { const formData = new FormData(); formData.append('name', userData.name); formData.append('phone', userData.phone); formData.append('address', JSON.stringify(userData.address)); formData.append('gender', userData.gender); formData.append('dob', userData.dob); if (image) formData.append('image', image); const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } }); if (!data.success) return toast.error(data.message); await loadUserProfileData(); setIsEdit(false); setImage(false); toast.success(data.message) } catch (error) { toast.error(error.message) }
  }
  return <main className='page-frame max-w-3xl'><div className='mb-10'><p className='eyebrow'>Your profile</p><h1 className='text-4xl font-semibold tracking-[-.05em] text-[#183a34] mt-3'>A little about you</h1></div><section className='soft-surface rounded-3xl p-6 sm:p-8'><label className='block w-28 cursor-pointer'>{isEdit ? <img className='w-28 h-28 object-cover rounded-2xl opacity-80' src={image ? URL.createObjectURL(image) : userData.image} alt='' /> : <img className='w-28 h-28 object-cover rounded-2xl' src={userData.image} alt='' />}{isEdit && <input className='hidden' type='file' onChange={(event) => setImage(event.target.files[0])} />}</label>{isEdit ? <input className='input-field text-2xl font-semibold mt-5 max-w-sm' value={userData.name} onChange={(event) => setUserData((prev) => ({ ...prev, name: event.target.value }))} /> : <h2 className='text-3xl font-semibold text-[#183a34] mt-5'>{userData.name}</h2>}<div className='grid sm:grid-cols-2 gap-8 border-t border-[#dce7e2] mt-8 pt-8'><div><p className='eyebrow'>Contact</p><p className='font-semibold mt-3'>Email</p><p className='text-gray-500 mt-1'>{userData.email}</p><p className='font-semibold mt-4'>Phone</p>{isEdit ? <input className='input-field mt-1' value={userData.phone} onChange={(event) => setUserData((prev) => ({ ...prev, phone: event.target.value }))} /> : <p className='text-gray-500 mt-1'>{userData.phone}</p>}</div><div><p className='eyebrow'>Details</p><p className='font-semibold mt-3'>Address</p>{isEdit ? <textarea className='input-field mt-1' value={userData.address.line1} onChange={(event) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: event.target.value } }))} /> : <p className='text-gray-500 mt-1'>{userData.address.line1}<br />{userData.address.line2}</p>}<p className='font-semibold mt-4'>Birthday</p><p className='text-gray-500 mt-1'>{userData.dob}</p></div></div><div className='mt-8'>{isEdit ? <button className='primary-button' onClick={updateProfile}>Save changes</button> : <button className='primary-button' onClick={() => setIsEdit(true)}>Edit profile</button>}</div></section></main>
}

export default MyProfile
