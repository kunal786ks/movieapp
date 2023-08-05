import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helper";
import {
  Alert,
  Box,
  Button,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { parseISO } from 'date-fns';

const Booking = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    seatNumber: "",
    date: "",
  });
  const [movie, setMovie] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // Checking if the entered seat is between valid value
    if (name === "seatNumber" && (value < 1 || value > 50)) {
      alert("Seat number must be between 1 and 50.");
      return;
    }
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const handleSuccess = () => {
    setShowSnackbar(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    const bookingDate = parseISO(inputs.date);
    const releaseDate = parseISO(movie.releaseDate);

    // Check if the booking date is not valid (before or on the release date)
    if (bookingDate <= releaseDate) {
      alert('Booking date must be after the movie release date.');
      return;
    }

    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        console.log(res);
        handleSuccess(); // Show the success message
      })
      .catch((err) => console.log(err));

    setInputs({
      seatNumber: "",
      date: "",
    });
  };

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
                  <Box borderRadius={'10px 10px 10px 10px'} border={'1px dashed black '}>
                    <Box
                      style={{
                        fontSize: "35px",
                        color: "lightgray",
                        textAlign: "center",
                      }}
                    >
                      Screen
                      <br />
                      ----------------------------------------
                    </Box>
                    <p style={{ textAlign: "center" }}></p>
                    <br />
                    <Box style={{ textAlign: "center", color: "gray",fontSize:'20px' }} sx={{mt:1}}>
                      Row 1: Seats Number form 1 to 10{" "}
                    </Box>
                    <Box style={{ textAlign: "center", color: "gray",fontSize:'20px' }} sx={{mt:1}}>
                      Row 2: Seats Number form 11 to 20
                    </Box>
                    <Box style={{ textAlign: "center", color: "gray",fontSize:'20px' }} sx={{mt:1}}>
                      Row 3: Seats Number form 21 to 30{" "}
                    </Box>
                    <Box style={{ textAlign: "center", color: "gray",fontSize:'20px' }} sx={{mt:1}}>
                      Row 4: Seats Number form 31 to 40
                    </Box>
                    <Box style={{ textAlign: "center", color: "gray",fontSize:'20px' }} sx={{mt:1}}>Row 5: Seats Number form 41 to 50 </Box>
                  </Box>
                  <FormLabel sx={{ mt: 4 }}>Seat Number</FormLabel>
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

          <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success">
              Movie booked successfully!
            </Alert>
          </Snackbar>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
