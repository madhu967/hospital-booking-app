import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { token, backendUrl, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Login')
  const [email, setEmail] = useState('demo@prescripto.com')
  const [password, setPassword] = useState('Demo@12345')
  const [name, setName] = useState('')

  useEffect(() => { if (token) navigate('/') }, [token])

  const useDemoLogin = () => {
    setState('Login')
    setEmail('demo@prescripto.com')
    setPassword('Demo@12345')
  }

  const loginDemo = async () => {
    const demoEmail = 'demo@prescripto.com'
    const demoPassword = 'Demo@12345'
    setState('Login')
    setEmail(demoEmail)
    setPassword(demoPassword)
    try {
      let { data } = await axios.post(backendUrl + '/api/user/login', { email: demoEmail, password: demoPassword })
      if (!data.success && data.message === 'User Not Found') {
        const registration = await axios.post(backendUrl + '/api/user/register', { name: 'Demo Patient', email: demoEmail, password: demoPassword })
        data = registration.data
      }
      if (!data.success) return toast.error(data.message)
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } catch (error) { toast.error(error.response?.data?.message || error.message) }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }
      const { data } = await axios.post(backendUrl + endpoint, payload)
      if (!data.success) return toast.error(data.message)
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } catch (error) { toast.error(error.message) }
  }

  return (
    <main className='page-frame grid lg:grid-cols-[1fr_420px] gap-12 items-center max-w-5xl mx-auto'>
      <section className='hidden lg:block rounded-[28px] bg-[#183a34] text-white p-12 min-h-[520px] relative overflow-hidden'>
        <p className='eyebrow text-[#a8d8cf]'>A better way to care</p>
        <h1 className='text-5xl font-semibold tracking-[-.05em] leading-tight mt-5'>Your health,<br /><span className='text-[#a8d8cf]'>in good hands.</span></h1>
        <p className='text-[#d5e7e2] leading-7 max-w-sm mt-6'>Book trusted specialists, keep your appointments close, and make healthcare feel a little more human.</p>
        <a className='inline-flex w-fit border border-[#a8d8cf] text-[#e6f4f1] rounded-full px-5 py-2.5 mt-6 text-sm font-semibold hover:bg-[#e6f4f1] hover:text-[#183a34] transition-colors' href='https://hospital-booking-app-jpza.vercel.app/' target='_blank' rel='noreferrer'>Admin / Doctor Login ↗</a>
        <div className='absolute -bottom-24 -right-14 w-72 h-72 rounded-full border border-[#5b9c91]' />
      </section>
      <form onSubmit={onSubmit} className='soft-surface rounded-3xl p-7 sm:p-10'>
        <p className='eyebrow'>{state === 'Sign Up' ? 'Start your care journey' : 'Welcome back'}</p>
        <h1 className='text-3xl font-semibold text-[#183a34] mt-3'>{state === 'Sign Up' ? 'Create your account' : 'Sign in to Prescripto'}</h1>
        <p className='text-gray-500 text-sm mt-3 mb-5'>{state === 'Sign Up' ? 'Save your care team and book appointments faster.' : 'Continue where you left off.'}</p>
        {state === 'Login' && <div className='rounded-xl bg-[#e6f4f1] p-3 text-sm text-[#0f766e] mb-5'><p className='font-semibold'>Demo credentials</p><p>demo@prescripto.com / Demo@12345</p><button type='button' onClick={loginDemo} className='underline font-semibold mt-1'>Login with demo account</button></div>}
        {state === 'Sign Up' && <label className='block text-sm font-semibold text-gray-600 mb-4'>Full name<input className='input-field mt-2' value={name} onChange={(event) => setName(event.target.value)} required /></label>}
        <label className='block text-sm font-semibold text-gray-600 mb-4'>Email<input className='input-field mt-2' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className='block text-sm font-semibold text-gray-600 mb-6'>Password<input className='input-field mt-2' type='password' value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        <button className='primary-button w-full' type='submit'>{state === 'Sign Up' ? 'Create account' : 'Sign in'}</button>
        <p className='text-sm text-gray-500 text-center mt-6'>{state === 'Sign Up' ? 'Already have an account?' : 'New to Prescripto?'} <button type='button' onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} className='font-semibold text-[#0f766e]'>{state === 'Sign Up' ? 'Sign in' : 'Create one'}</button></p>
        <a className='w-full text-center text-sm font-semibold text-[#0f766e] border-t border-[#dce7e2] pt-5 mt-2' href='https://hospital-booking-app-jpza.vercel.app/' target='_blank' rel='noreferrer'>Admin / Doctor Login ↗</a>
      </form>
    </main>
  )
}

export default Login
