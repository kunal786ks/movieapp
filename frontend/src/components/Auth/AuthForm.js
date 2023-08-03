import React, { useState } from 'react'
import { Dialog, Typography, Box, TextField, Button, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const AuthForm = ({ onSubmit, isAdmin }) => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isSignUp, setIsSignUp] = useState(false)
    const changePage = (e) => {
        e.preventDefault();
        setIsSignUp(!isSignUp)
    }
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ inputs, signup: isAdmin ? false : isSignUp }); //passing data to parent
    }
    return (
        <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
            <Box sx={{ ml: 'auto', padding: 1 }}>
                <IconButton>
                    <CloseRoundedIcon />
                </IconButton>
            </Box>
            <Typography variant='h4' textAlign={'center'} padding={"20px"}>
                {isSignUp ? "SignUp" : 'Login'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box
                    padding='15px'
                    display={'flex'}
                    justìfyContent={'center'}
                    flexDirection="column"
                    width={400}
                    margin="auto"
                    alignItems={'center'}
                >
                    {/* <FormLabel sx={labelStyle}>Email</FormLabel> */}
                    {!isAdmin && isSignUp && <> <TextField value={inputs.name} onChange={handleChange} margin="normal" variant="outlined" type={"text"} fullWidth label="Name" name='name' /></>}
                    <TextField value={inputs.email} onChange={handleChange} margin="normal" variant="outlined" type={"email"} fullWidth label="Eamil" name='email' />
                    {/* <FormLabel sx={labelStyle}>Password</FormLabel> */}
                    <TextField value={inputs.password} onChange={handleChange} margin="normal" variant="outlined" type={"password"} fullWidth label="Password" name='password' />
                    <Button
                        variant='contained'
                        sx={{ mt: 2, borderRadius: 10, bgColor: "#2b2d42" }} type="submit" fullWidth>{isSignUp ? "SignUp" : 'Login'}</Button>
                    {!isAdmin && <Button onClick={(e) => changePage(e)}
                        sx={{ mt: 2, borderRadius: 10 }} type="submit" fullWidth>Switch To {isSignUp ? "Login" : "SignUp"}</Button>}
                </Box>
            </form>
        </Dialog>
    )
}

export default AuthForm
