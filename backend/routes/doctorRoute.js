import { doctorAppointments, doctorList, doctorProfile, loginDoctor, updateDoctorAvailability } from '../controllers/doctorController.js'
import express from 'express'
import authDoctor from '../middleware/authDoctor.js'


const doctorRouter =express.Router()

doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/list',doctorList)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.get('/appointments', authDoctor, doctorAppointments)
doctorRouter.post('/availability', authDoctor, updateDoctorAvailability)

export default doctorRouter