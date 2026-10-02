import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => (
  <main className='page-frame'>
    <section className='grid md:grid-cols-2 gap-12 items-center'>
      <div><p className='eyebrow'>We are here to help</p><h1 className='text-5xl font-semibold tracking-[-.06em] text-[#183a34] mt-4'>Let’s talk about your care.</h1><p className='text-gray-500 leading-7 mt-6 max-w-md'>Questions about appointments, our doctors, or your account? Our team is ready to help.</p><div className='space-y-5 mt-10 text-sm'><div><p className='font-semibold text-[#183a34]'>Visit our office</p><p className='text-gray-500 mt-1'>54709 Willms Station, Suite 350<br />Washington, USA</p></div><div><p className='font-semibold text-[#183a34]'>Reach the care team</p><p className='text-gray-500 mt-1'>+1 212 456 7890<br />hello@prescripto.com</p></div></div></div>
      <img className='w-full rounded-[28px]' src={assets.contact_image} alt='Prescripto care team' />
    </section>
  </main>
)

export default Contact
