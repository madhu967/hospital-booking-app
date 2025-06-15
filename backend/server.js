import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCLoudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRouter.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app=express();
const port =process.env.PORT || 4000;
connectDB();
connectCLoudinary()

//middlewares
app.use(cors());
app.use(express.json());

//api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send('Hello Expresss');
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})