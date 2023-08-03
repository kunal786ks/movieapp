import express  from "express";
import { deleteUser, getAllUsers, getUserById, login, signUp, updateUser } from "../controllers/user-controller.js";
import { getMoviesOfUser } from "../controllers/booking-controller.js";



const userRouter=express.Router();



userRouter.get("/",getAllUsers) //get all user
userRouter.get("/:id",getUserById)//getting user by id
userRouter.post("/signup",signUp) //adding new user
userRouter.put("/:id",updateUser) //updating the existing user
userRouter.delete('/:id',deleteUser) //deleting the existing user
userRouter.post("/login",login) //login with email and password
userRouter.get('/bookings/:id',getMoviesOfUser)//movie of the specific user

export default userRouter;