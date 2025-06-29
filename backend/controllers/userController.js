import validator from 'validator'
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';

//api to register user
const registerUser =async (req,res)=>{
    try {
        
        const {name,email,password}=req.body;
        
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing deatils"})
        }

        if(!validator.isEmail(email)){
             return res.json({success:false,message:"Enter a valid Email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Enter a Strong password"});
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser =new userModel(userData);
        const user =await newUser.save();

        const token =jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//api for user login

const loginUser =async (req,res)=>{

    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'User Not Found'})
        }

        const isMatch =await bcrypt.compare(password,user.password);
        if(isMatch){
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:'Invalid credentials'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//api to get user profile data
const getProfile =async (req,res)=>{
    try {
        
        const userId =req.user.id
        const userData =await userModel.findById(userId).select('-password')
        console.log(userData);

        res.json({success:true,userData})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// api to update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    const userId = req.user.id; // ✅ get from auth middleware

    if (!userId || !name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    let updateData = {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile Updated", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//api to book appointment
const bookAppointment =async (req,res)=>{
  try {
    
    const userId=req.user.id;
    const {docId,slotDate,slotTime}=req.body;

    const docData =await doctorModel.findById(docId).select('-password');

    if(!docData.available){
      return res.json({success:false,message:"Doctor not available"});

    let slots_booked =docData.slots_booked

    //cheking for slots avilablity
    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,message:'Slot not available'});
      }
      else{
        slots_booked[slotDate].push(slotTime)

      }
    }

    }
    else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)

      
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export {registerUser,loginUser,getProfile,updateProfile};