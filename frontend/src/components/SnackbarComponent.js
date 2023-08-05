// SnackbarComponent.js (Name it as per your file structure)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideSnackbar } from '../store/store.js';
const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbar);

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar()); // Dispatch hideSnackbar action to close the snackbar
  };

  return (
    <Snackbar open={snackbarState?.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity="success">
        {snackbarState?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
