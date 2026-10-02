import React from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Admin');
    
    const {setAToken, backendUrl} = useContext(AdminContext);
    const [email, setEmail] = useState('admin@prescripto.com');
    const [password, setPassword] = useState('admin123');

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

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password});
                if(data.success){
                    localStorage.setItem('atoken', data.token)
                    localStorage.setItem('role', 'Admin')
                    setAToken(data.token);
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password});
                if(data.success){
                    localStorage.setItem('atoken', data.token)
                    localStorage.setItem('role', 'Doctor')
                    setAToken(data.token)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen bg-[#f4f7f5] flex items-center justify-center px-4'>
       <div className='admin-card flex flex-col gap-5 items-start p-8 w-full max-w-sm text-sm'>
        
        {/* Header */}
        <div className='w-full text-center'>
          <p className='admin-eyebrow mb-1'>{state} Access</p>
          <h1 className='text-3xl font-semibold text-[#183a34]'>Welcome back</h1>
          <p className='text-gray-500 text-sm mt-1'>Sign in to your portal</p>
        </div>

        {/* Role Toggle */}
        <div className='grid grid-cols-2 gap-2 w-full p-1 bg-[#f4f7f5] rounded-xl'>
            <button
              type='button'
              onClick={() => useDemoLogin('Admin')}
              className={`rounded-lg py-2.5 text-sm font-semibold transition-all ${state === 'Admin' ? 'bg-[#0f766e] text-white shadow-sm' : 'text-[#52615d] hover:text-[#0f766e]'}`}
            >
              Admin
            </button>
            <button
              type='button'
              onClick={() => useDemoLogin('Doctor')}
              className={`rounded-lg py-2.5 text-sm font-semibold transition-all ${state === 'Doctor' ? 'bg-[#0f766e] text-white shadow-sm' : 'text-[#52615d] hover:text-[#0f766e]'}`}
            >
              Doctor
            </button>
        </div>

        {/* Demo Credentials */}
        <div className='w-full rounded-xl bg-[#e6f4f1] border border-[#c8e6e0] p-4 text-sm text-[#0f766e]'>
            <p className='font-semibold'>Demo credentials</p>
            <p className='mt-1 text-[#0f766e]/80'>{state === 'Admin' ? 'admin@prescripto.com / admin123' : 'bulk-doctor-2026-01@prescripto.com / Doctor@2026'}</p>
            <button type='button' onClick={() => loginDemo(state)} className='underline font-semibold mt-2 hover:text-[#0b5f59] transition-colors'>Login with demo account →</button>
        </div>

        {/* Email */}
        <div className='w-full'>
            <p className='font-semibold text-[#183a34] mb-1.5'>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full border-1.5 border-[#d6e2dd] rounded-xl bg-[#fbfdfc] p-3 outline-none focus:border-[#0f766e] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] transition-all'
              type="email"
              required
            />
        </div>

        {/* Password */}
        <div className='w-full'>
            <p className='font-semibold text-[#183a34] mb-1.5'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full border-1.5 border-[#d6e2dd] rounded-xl bg-[#fbfdfc] p-3 outline-none focus:border-[#0f766e] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] transition-all'
              type="password"
              required
            />
        </div>

        <button className='bg-[#0f766e] text-white w-full py-3.5 rounded-full text-base font-semibold hover:bg-[#0b5f59] hover:shadow-md transition-all'>
          Sign in
        </button>
       </div>
    </form>
  )
}

export default Login