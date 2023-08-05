import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { addMovie } from "../../api-helpers/api-helper";

const labelProps = {
  mt: 1,
  mb: 1,
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: new Date(),
    featured: false,
  });
  const [actor, setActor] = useState("");
  const [actors, setActors] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any input fields are empty
    const isAnyFieldEmpty = Object.values(inputs).some((value) => value === "");
    if (isAnyFieldEmpty) {
      alert("Please fill out all the fields.");
      return;
    }

    addMovie({ ...inputs, actors })
      .then((res) => {
        console.log(res);
        setShowSnackbar(true);
        setSnackbarMessage("Movie added successfully!");
      })
      .catch((err) => console.log(err));

    setInputs({
      title: "",
      description: "",
      posterUrl: "",
      releaseDate: new Date(),
      featured: false,
    });
    setActors([]);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width="50%"
          padding={10}
          margin="auto"
          display="flex"
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add new Movie
          </Typography>
          <FormLabel sx={{ labelProps }}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
            required
          ></TextField>
          <FormLabel sx={{ labelProps }}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
            required
          ></TextField>
          <FormLabel sx={{ labelProps }}>Poster Url</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
            required
          ></TextField>
          <FormLabel sx={{ labelProps }}>Release Date</FormLabel>
          <TextField
            type="date"
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
            required
          ></TextField>
          <FormLabel sx={{ labelProps }}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              name="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
              
            ></TextField>
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add Actor
            </Button>
          </Box>
          <FormLabel sx={{ labelProps }}>Featured</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({ ...prevState, featured: e.target.checked }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "gray",
              ":hover": {
                bgColor: "black",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>

      {/* Snackbar to show success message */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddMovie;
