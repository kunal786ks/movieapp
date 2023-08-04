import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getMovieDetails, getUserBooking, getUserDetails } from "../api-helpers/api-helper";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import DeleteIcon from '@mui/icons-material/Delete';
const UserProfile = () => {
  const [bookings, setBokings] = useState();
  const [movie,setMovie]=useState();
  const [user,setUser]=useState();
  const [del,setDel]=useState(true)
  useEffect(() => {
    getUserBooking()
      .then((res) => setBokings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails().then(res=>setUser(res.user)).catch(err=>console.log(err))
    
    console.log('erd')
  }, [del]);

  console.log(bookings);
  // console.log("this is movie",movie)
  const handleDelete=(id)=>{
    
    deleteBooking(id).then(res=>{
      console.log(res)
      setDel(!del)
    }).catch(err=>console.log(err))
    
  }
  return (
    <Box width="100%" display={"flex"}>
      
        <Fragment>
          {" "}
          {user && <Box
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
          </Box>}
         {bookings &&  (<Box width="70%" display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign={"center"}
              padding={2}
            >
              BooKings
            </Typography>
            <Box
              margin="auto"
              display={"flex"}
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking,index)=>(
                  <ListItem sx={{bgcolor:'gray',color:'white',textAlign:'center',margin:1}}>
                    <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>Movie: {booking.movie.title}</ListItemText>
                    <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>Seat: {booking.seatNumber}</ListItemText>
                    <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>Date: {new Date(booking.date).toDateString()}</ListItemText>
                    <IconButton onClick={()=>handleDelete(booking._id)}color='error'>
                      <DeleteIcon  />
                    </IconButton>
                  </ListItem>
                  
                ))}
              </List>
            </Box>
          </Box>
          )}
        </Fragment>
      
    </Box>
  );
};

export default UserProfile;
