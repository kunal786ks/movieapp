import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helper';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false); // State to control error Snackbar visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message

  const onResreceived = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem('userId', data.id);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate('/');
    }, 3000);
  };

  const onError = (err) => {
    console.error(err);
    setErrorMessage('An error occurred. Please try again later.');
    setErrorSnackbar(true);
  };

  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResreceived)
      .catch(onError);
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />

      {/* Snackbar to show success message */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          {showSnackbar ? 'Login/Signup successful! Redirecting to homepage...' : ''}
        </Alert>
      </Snackbar>

      {/* Snackbar to show error message */}
      <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={() => setErrorSnackbar(false)}>
        <Alert onClose={() => setErrorSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Auth;
