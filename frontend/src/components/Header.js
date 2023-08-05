import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { Box } from '@mui/system';
import { getAllMovies } from '../api-helpers/api-helper';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const Logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelected(newValue);
  };

  const handleTabClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar sx={{ bgcolor: 'gray' }} position='sticky'>
      <Toolbar>
        <Box width={'20%'}>
          <IconButton component={Link} to='/'>
            <MovieIcon />
          </IconButton>
        </Box>
        <Box width={'30%'} margin={'auto'}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: 'white' } }}
                variant='standard'
                {...params}
                label='Search across movie'
              />
            )}
          />
        </Box>
        <Box display={'flex'}>
          <Tabs
            textColor='inherit'
            indicatorColor='white'
            value={value}
            onChange={handleTabClick}
          >
            <Tab component={Link} to='/movies' label='Movies' value={0} />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab component={Link} to='/auth' label='Auth' value={1} />
                <Tab component={Link} to='/admin' label='Admin' value={2} />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab component={Link} to='/user' label='Profile' value={3} />
                <Tab
                  component={Link}
                  to='/'
                  onClick={() => Logout(false)}
                  label='Logout'
                  value={4}
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab component={Link} to='/add' label='Add Movie' value={5} />
                <Tab component={Link} to='/user-admin' label='Profile' value={6} />
                <Tab
                  component={Link}
                  to='/'
                  onClick={() => Logout(true)}
                  label='Logout'
                  value={7}
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
