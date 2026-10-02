import express from 'express'
import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

const loginDoctor = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        const validPassword = await bcrypt.compare(password, doctor.password);
        if (!validPassword) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET);
        return res.json({ success: true, token, doctor: { name: doctor.name, email: doctor.email } });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

const changeAvailability=async(req,res)=>{
    try {
        
        const {docId} =req.body;

        const docData =await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:'Availability Changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorList=async(req,res)=>{
    try {
        
        const doctors =await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorProfile = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.doctor.id).select('-password');
        if (!doctor) return res.json({ success: false, message: 'Doctor not found' });
        res.json({ success: true, doctor });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const doctorAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ docId: req.doctor.id }).sort({ date: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const updateDoctorAvailability = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.doctor.id);
        if (!doctor) return res.json({ success: false, message: 'Doctor not found' });
        doctor.available = !doctor.available;
        await doctor.save();
        res.json({ success: true, available: doctor.available, message: `You are now ${doctor.available ? 'available' : 'unavailable'}` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export {changeAvailability,doctorList,loginDoctor,doctorProfile,doctorAppointments,updateDoctorAvailability}