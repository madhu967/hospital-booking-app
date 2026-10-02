import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'

// api for adding doctor
const addDoctor =async(req,res)=>{

    try {

        const {name,password,speciality,degree,experience,about,fees,address}=req.body;
        const email = req.body.email?.trim().toLowerCase();
        const imageFile =req.file;
        //checking for all data to add doctor

        if(!name || !email || !password || !speciality || !degree || ! experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing details"})
        }

        //valiadting email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }

        //validating storng passowrd

        if(password.length <8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing doctor password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl = imageUpload.secure_url;

        const doctorData ={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor =new doctorModel(doctorData);
        await newDoctor.save();
        
        res.json({success:true,message:"Doctor Added"});

        // console.log(name,email,password,speciality,degree,experience,about,fees,address,image)
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api for admin login
const loginAdmin =async (req,res)=>{
     try {
        
        const email = req.body.email?.trim().toLowerCase();
        const {password}=req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token =jwt.sign(email + password,process.env.JWT_SECRET)
            res.json({success:true,token})

        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
     } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
     }
}

//api to get all doctors list for admin panel
const allDoctors =async (req,res)=>{
    try {
        
        const doctors =await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const dashboardData = async (req, res) => {
    try {
        const [doctors, users, appointments, activeAppointments, recentAppointments] = await Promise.all([
            doctorModel.countDocuments(),
            userModel.countDocuments(),
            appointmentModel.countDocuments(),
            appointmentModel.countDocuments({ cancelled: false }),
            appointmentModel.find({}).sort({ date: -1 }).limit(6).select('-userData.password -docData.password'),
        ]);

        res.json({
            success: true,
            stats: { doctors, users, appointments, activeAppointments },
            recentAppointments,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({}).sort({ date: -1 }).select('-userData.password -docData.password');
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password').sort({ _id: -1 });
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, loginAdmin, allDoctors, dashboardData, allAppointments, allUsers }