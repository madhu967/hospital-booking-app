import React from 'react'
import { assets } from '../assets/assets'

const About = () => (
  <main className='page-frame'>
    <section className='grid md:grid-cols-[.9fr_1.1fr] gap-10 items-center mb-20'>
      <div><p className='eyebrow'>Our story</p><h1 className='text-5xl font-semibold tracking-[-.06em] text-[#183a34] mt-4'>Healthcare should feel less complicated.</h1></div>
      <p className='text-lg leading-8 text-gray-500'>Prescripto brings trusted doctors and thoughtful digital tools into one calm place. We are here to make finding care feel clear, personal, and genuinely easy.</p>
    </section>
    <section className='grid md:grid-cols-2 gap-10 items-center'>
      <img className='w-full rounded-[28px] object-cover' src={assets.about_image} alt='A caring healthcare experience' />
      <div className='space-y-6 text-gray-600 leading-7'><p>From the first search to the moment you book, every part of Prescripto is designed around confidence and clarity.</p><p>Our vision is simple: make it easier to access the right care, at the right time, with the right person.</p><div className='grid grid-cols-2 gap-4 pt-4'><div className='soft-surface rounded-2xl p-5'><b className='text-2xl text-[#183a34]'>50+</b><p className='text-sm mt-1'>trusted clinicians</p></div><div className='soft-surface rounded-2xl p-5'><b className='text-2xl text-[#183a34]'>6</b><p className='text-sm mt-1'>care specialties</p></div></div></div>
    </section>
  </main>
)

export default About
