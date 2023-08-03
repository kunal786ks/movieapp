import express  from "express";
import { addMovie, getAllMovies, getMovieById } from "../controllers/movie-controller.js";

const movieRouter=express.Router();


movieRouter.get("/",getAllMovies)
movieRouter.post("/",addMovie)
movieRouter.get("/:id",getMovieById)

export default movieRouter;