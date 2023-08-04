import mongoose, { mongo } from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let existingMovie;
  let exisitingUser;
  try {
    existingMovie = await Movie.findById(movie);
    exisitingUser = await User.findById(user);
  } catch (Err) {
    return console.log(Err);
  }
  if (!existingMovie) {
    res.status(404).json({ message: "Movie Not found with given id" });
  }
  if (!exisitingUser) {
    return res.status(404).json({ message: "user not found with given id" });
  }
  let booking;
  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    exisitingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await exisitingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
    // booking = await booking.save();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "unable to create a booking" });
  }
  return res.status(201).json({ booking: booking });
};

export const getBookingById = async (req, res, next) => {
  const { id } = req.params;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const { id } = req.params;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log(booking)
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction()
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "movie deleted successfully" });
};

export const getMoviesOfUser=async(req,res,next)=>{
  const {id}=req.params;
  let bookings;
  try{
    bookings=await Bookings.find({user:id}).populate("movie")
  }catch(err){
    return console.log(err)
  }
  if(!bookings){
    return res.status(500).json({message:'unable to get movie'});
  }
  return res.status(200).json({bookings})
}
