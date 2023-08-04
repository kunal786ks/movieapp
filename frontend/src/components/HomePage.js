import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helper'

const HomePage = () => {
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>{
            console.log(err)
        })
    },[])
    console.log('this is',movies)
  return (
    <Box width={'100%'} height={'100%'} marginTop={2} margin="auto">
     <Box margin={'auto'} width={'80%'} height={'40vh'} padding={2}>
        <img width={'100%'} height={'100%'} padding={2}
        
        src='https://static-koimoi.akamaized.net/wp-content/new-galleries/2018/12/kgf-chapter-1-movie-review-yashs-journey-from-style-to-stale-2.jpg' alt='kgf'/>
     </Box>
     <Box padding={5} margin={'auto'}>
        <Typography variant='h4' textAlign={'center'}>Latest Releases</Typography>
     </Box>
     <Box display="flex" width="100%" justifyContent={'space-between'} flexWrap="wrap">
        {movies && movies.slice(0,6).map((movie,index)=><MovieItem id={movie._id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            releaseDate={movie.releaseDate}
        key={index}/>)}
     </Box>
     <Box display="flex" padding={5} margin={'auto'}>
        <Button LinkComponent={Link} to="/movies" variant='outlined' sx={{margin:'auto',color:'gray'}}>View All </Button>
     </Box>
    </Box>
  )
}

export default HomePage
