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
    const [email,setEmail]=useState('admin@prescripto.com');
    const [password,setPassword]=useState('admin123');

    const useDemoLogin = (type) => {
        setState(type)
        setEmail(type === 'Admin' ? 'admin@prescripto.com' : 'bulk-doctor-2026-01@prescripto.com')
        setPassword(type === 'Admin' ? 'admin123' : 'Doctor@2026')
    }

    const loginDemo = async (type) => {
        const demoEmail = type === 'Admin' ? 'admin@prescripto.com' : 'bulk-doctor-2026-01@prescripto.com'
        const demoPassword = type === 'Admin' ? 'admin123' : 'Doctor@2026'
        setState(type)
        setEmail(demoEmail)
        setPassword(demoPassword)
        try {
            const endpoint = type === 'Admin' ? '/api/admin/login' : '/api/doctor/login'
            const { data } = await axios.post(backendUrl + endpoint, { email: demoEmail, password: demoPassword })
            if (!data.success) return toast.error(data.message)
            localStorage.setItem('atoken', data.token)
            localStorage.setItem('role', type)
            setAToken(data.token)
        } catch (error) { toast.error(error.response?.data?.message || error.message) }
    }

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
        <div className='grid grid-cols-2 gap-2 w-full mt-2'>
            <button type='button' onClick={()=>useDemoLogin('Admin')} className={`rounded-xl py-2.5 text-sm font-semibold ${state === 'Admin' ? 'bg-[#0f766e] text-white' : 'border border-[#b7ded9] text-[#0f766e]'}`}>Admin Login</button>
            <button type='button' onClick={()=>useDemoLogin('Doctor')} className={`rounded-xl py-2.5 text-sm font-semibold ${state === 'Doctor' ? 'bg-[#0f766e] text-white' : 'border border-[#b7ded9] text-[#0f766e]'}`}>Doctor Login</button>
        </div>
        <div className='w-full rounded-xl bg-[#e6f4f1] p-3 text-sm text-[#0f766e]'>
            <p className='font-semibold'>Demo credentials</p>
            <p>{state === 'Admin' ? 'admin@prescripto.com / admin123' : 'bulk-doctor-2026-01@prescripto.com / Doctor@2026'}</p>
            <button type='button' onClick={() => loginDemo(state)} className='underline font-semibold mt-1'>Login with demo account</button>
        </div>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border border-[#d6e2dd] rounded-xl bg-[#fbfdfc] p-3 mt-1 outline-none focus:border-[#0f766e]' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border border-[#d6e2dd] rounded-xl bg-[#fbfdfc] p-3 mt-1 outline-none focus:border-[#0f766e]' type="password" required />
        </div>
        <button className='bg-[#0f766e] text-white w-full py-3 rounded-full text-base font-semibold'>Login</button>
       </div>
    </form>
  )
}

export default Login