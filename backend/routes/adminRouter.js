import express from 'express'
import {addDoctor,allAppointments,allDoctors,allUsers,dashboardData,loginAdmin} from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter =express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/dashboard',authAdmin,dashboardData)
adminRouter.get('/all-appointments',authAdmin,allAppointments)
adminRouter.get('/all-users',authAdmin,allUsers)

export default adminRouter