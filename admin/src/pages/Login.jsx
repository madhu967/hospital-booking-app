import React from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    const [state,setState]=useState('Admin');
    
    const {setAToken,backendUrl}=useContext(AdminContext);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onSubmitHandler =async (event)=>{
        event.preventDefault();
        try {
            if(state === 'Admin'){
                const {data} =await axios.post(backendUrl + '/api/admin/login' , {email,password});
                if(data.success){
                    localStorage.setItem('atoken',data.token)
                    localStorage.setItem('role','Admin')
                    setAToken(data.token);

                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const {data} =await axios.post(backendUrl + '/api/doctor/login' , {email,password});
                if(data.success){
                    localStorage.setItem('atoken',data.token)
                    localStorage.setItem('role','Doctor')
                    setAToken(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    
    
  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen bg-[#f4f7f5] flex items-center px-4'>
       <div className='admin-card flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-2xl text-gray-600 text-sm'>
        <p className='admin-eyebrow m-auto'>{state} access</p>
        <h1 className='text-3xl font-semibold text-[#183a34] m-auto'>Welcome back</h1>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border border-[#d6e2dd] rounded-xl bg-[#fbfdfc] p-3 mt-1 outline-none focus:border-[#0f766e]' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border border-[#d6e2dd] rounded-xl bg-[#fbfdfc] p-3 mt-1 outline-none focus:border-[#0f766e]' type="password" required />
        </div>
        <button className='bg-[#0f766e] text-white w-full py-3 rounded-full text-base font-semibold'>Login</button>
        {
            state === 'Admin'
            ? <p>Doctor Login <button type='button' className='text-[#0f766e] font-semibold underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</button></p>
            :<p>Admin Login <button type='button' className='text-[#0f766e] font-semibold underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</button></p>
        }
       </div>
    </form>
  )
}

export default Login