import express from 'express';
const app = express()
import mongoose from 'mongoose';
import cors from 'cors'

import dotenv from 'dotenv';
import faq from './routes/route.js';

dotenv.config()
mongoose.connect(process.env.MongoURI).then(()=>console.log("MongoDB Connected"));
app.use(cors({ 
    origin: "" ||'http://localhost:3000' ,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE"})); 
    app.use(express.json());
app.use('/api',faq);


app.listen(process.env.PORT,()=>console.log(`Server Started at ${process.env.PORT}`))