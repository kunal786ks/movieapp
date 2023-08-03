import express from "express";
import mongoose from 'mongoose' 
import dotenv from 'dotenv'
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-route.js";
import bookingRouter from "./routes/booking-routes.js";
import cors from 'cors'
// import userRouter from "./routes/user-routes";

dotenv.config()
const app=express();


//middleware
app.use(cors())
app.use(express.json()) // to tell the application what kind of data we are dealing with
app.use("/user", userRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/booking",bookingRouter)


mongoose
.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.w2qvzul.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`connect To Database And server is running at ${process.env.PORT}`)
        });
    })
    .catch(e=>console.log(e));






//ASjhkGLWcIShXqpv