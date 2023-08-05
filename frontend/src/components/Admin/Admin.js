import React, { useState } from 'react';
import AuthForm from '../Auth/AuthForm';
import { sendAdminLoginReq } from '../../api-helpers/api-helper';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Admin = () => {
  // const [loadin,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const onResreceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem('adminId', data.id);
    localStorage.setItem('token', data.token);
    setShowSuccessSnackbar(true); // Show the success message Snackbar

    setTimeout(() => {
      // setLoading(true);
      setShowSuccessSnackbar(false); // Hide the success message Snackbar after a few seconds
      // setLoading(false);
      navigate('/');
    }, 3000); // You can adjust the auto-hide duration as needed
  };

  const onError = (err) => {
    console.error(err);
    alert('An error occurred during login. Please try again later.');
  };

  const getData = (data) => {
    console.log('admin', data);
    sendAdminLoginReq(data.inputs)
      .then(onResreceived)
      .catch(onError);
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
      {/* {loadin && alert('loading...')} */}
      {/* Snackbar to show success message */}
      <Snackbar open={showSuccessSnackbar} autoHideDuration={3000} onClose={() => setShowSuccessSnackbar(false)}>
        <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">
          Admin login successful! Redirecting to homepage...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Admin;
