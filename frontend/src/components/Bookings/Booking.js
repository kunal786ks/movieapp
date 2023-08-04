import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helper";
import { Alert, Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
  const navigate=useNavigate();
  const [inputs, setInputs] = useState({
    seatNumber: "",
    date: "",
  });
  const [movie, setMovie] = useState();
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(movie);
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id }).then((res) => console.log(res)).catch(err => console.log(err))
    setInputs({
      seatNumber: "",
      date: "",
    })

  }
return (
  <div>
    {movie && (
      <Fragment>
        <Typography
          textAlign="center"
          padding={2}
          fontFamily="fantasy"
          variant="h4"
        >
          Books Tickets of Movie : {movie.title}
        </Typography>
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            display={"flex"}
            justifyContent={"column"}
            flexDirection={"column"}
            paddingTop={3}
            width="50%"
            marginRight={"auto"}
          >
            <img
              width="80%"
              height="300px"
              src={movie.posterUrl}
              alt={movie.title}
            />
            <Box width="80%" marginTop={3} padding={2}>
              <Typography paddingTop={2}>{movie.description}</Typography>

              <Typography fontWeight={"bold"} marginTop={1}>
                Starrer : {movie.actors.map((actor) => actor + " ")}
              </Typography>
              <Typography fontWeight={"bold"} marginTop={1}>
                Release Date : {new Date(movie.releaseDate).toDateString()}
              </Typography>
            </Box>
          </Box>
          <Box width="50%" paddintTop={3}>
            <form onSubmit={handleSubmit}>
              <Box
                flexDirection="column"
                padding={5}
                margin={"auto"}
                display={"flex"}
              >
                <FormLabel>Seat Number</FormLabel>
                <TextField
                  name="seatNumber"
                  type="number"
                  value={inputs.seatNumber}
                  onChange={handleChange}
                  margin="normal"
                  variant="standard"
                />
                <FormLabel>Booking Date</FormLabel>
                <TextField
                  name="date"
                  value={inputs.date}
                  onChange={handleChange}
                  type="date"
                  margin="normal"
                  variant="standard"
                />
                <Button type="submit" sx={{ mt: 3 }}>
                  Book Now
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Fragment>
    )}
  </div>
);
};

export default Booking;
