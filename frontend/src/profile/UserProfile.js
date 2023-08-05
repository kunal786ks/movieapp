import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getMovieDetails, getUserBooking, getUserDetails } from "../api-helpers/api-helper";
import { Box, IconButton, List, ListItem, ListItemText, Typography, Snackbar, Alert } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import DeleteIcon from '@mui/icons-material/Delete';

const UserProfile = () => {
  const [bookings, setBokings] = useState([]);
  const [movie, setMovie] = useState();
  const [user, setUser] = useState();
  const [del, setDel] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false); // Define showSnackbar state
  const [deletedBooking, setDeletedBooking] = useState(null);

  useEffect(() => {
    getUserBooking()
      .then((res) => setBokings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails().then(res => setUser(res.user)).catch(err => console.log(err));
  }, [del]);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        setDel(!del);
        setDeletedBooking(res.deletedBooking); // Save the deleted booking details
        setShowSnackbar(true); // Show the success message
      })
      .catch(err => console.log(err));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false); // Close the snackbar
  };

  return (
    <Box width="100%" display={"flex"}>
      <Fragment>
        {user && (
          <Box
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="30%"
            padding={3}
          >
            <FaceIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 2 }} />
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name : {user.name}
            </Typography>
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        
        {bookings.length > 0 ? (
          <Box width="70%" display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign={"center"}
              padding={2}
            >
              Your All Bookings
            </Typography>
            <Box
              margin="auto"
              display={"flex"}
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem key={index} sx={{ bgcolor: 'gray', color: 'white', textAlign: 'center', margin: 1 }}>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>Movie: {booking.movie.title}</ListItemText>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>Seat: {booking.seatNumber}</ListItemText>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>Date: {new Date(booking.date).toDateString()}</ListItemText>
                    <IconButton onClick={() => handleDelete(booking._id)} color='error'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        ):<Typography
        variant="h3"
        fontFamily={"verdana"}
        textAlign={"center"}
        padding={2}
      >Add Your Favorite Movie to watch</Typography>}
      </Fragment>
      {/* Snackbar to show success message */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
         Your booking has been successfully deleted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
