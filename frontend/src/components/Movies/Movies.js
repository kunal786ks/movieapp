import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helper'
import MovieItem from './MovieItem'

const Movies = () => {
    const [movies,setMovies]=useState([])
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))
    },[])
  return (
    <Box margin={'auto'} marginTop={4}>
        <Typography
        margin={"auto"}
        width='40%'
         variant="h4"
          color={'white'}
          bgcolor={"#900c3F"} 
          padding={2} 
          textAlign={'center'}>
        All Movies
        </Typography>
        <Box
        marginTop={5}
        justifyContent='flex-start'
            width={'100%'} margin={'auto'} display={'flex'} 
            flexWrap={'wrap'}
            >
                {
                    movies && movies.map((movie,index)=>
                        <MovieItem key={index} id={movie._id} posterUrl={movie.posterUrl}
                            releaseDate={movie.releaseDate} title={movie.title}
                            />
                        )
                }
        </Box>
    </Box>
  )
}

export default Movies
