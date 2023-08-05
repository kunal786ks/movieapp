import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    message: '',
  },
  // other initial states for other slices...
};

const store = configureStore({
  reducer: {
    snackbar: (state = initialState.snackbar, action) => {
      switch (action.type) {
        case 'SHOW_SNACKBAR':
          return {
            ...state,
            open: true,
            message: action.payload,
          };
        case 'HIDE_SNACKBAR':
          return {
            ...state,
            open: false,
            message: '',
          };
        default:
          return state;
      }
    },
    // other reducers for other slices...
  },
});

export const showSnackbar = (message) => ({ type: 'SHOW_SNACKBAR', payload: message });
export const hideSnackbar = () => ({ type: 'HIDE_SNACKBAR' });

export default store;