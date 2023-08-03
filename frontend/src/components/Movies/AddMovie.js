import React from "react";
import { Box, Typography } from "@mui/material";
const AddMovie = () => {
  return (
    <div>
      <form>
        <Box
          width="50%"
          padding={10}
          margin="auto"
          display="flex"
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography
            textAlign={"center"}
            variant="h5"
            fontFamily={"verdana"}
          >Add new Movie</Typography>
          
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
