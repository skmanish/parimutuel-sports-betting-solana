import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useState, createContext} from 'react';

export interface Toast {
    message: string,
    type: 'error'|'success',
    open: boolean,
};

export const ToastContext = createContext({
  successMessage: (message: string) => {},
  failureMessage: (message: string) => {},
});

export const ToastContextProvider = (props: {children?: any}) => {
  const [toast, setToast] = useState({
    message: '',
    type: 'success',
    open: false,
  } as Toast);
  const successMessage = (message: string) => {
    setToast({
      message: message,
      type: 'success',
      open: true,
    });
  };
  const failureMessage = (message: string) => {
    setToast({
      message: message,
      type: 'error',
      open: true,
    });
  };
  return (
    <ToastContext.Provider value={{
      successMessage: successMessage,
      failureMessage: failureMessage}}>
      {toast.type == 'error' &&
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          onClose={() => setToast({open: false, message: '', type: 'error'})}>
          <Alert severity="error" elevation={6} variant='filled'>
            {toast.message}
          </Alert>
        </Snackbar>}
      {toast.type == 'success' &&
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          onClose={() => setToast({open: false, message: '', type: 'error'})}>
          <Alert severity="success" elevation={6} variant='filled'>
            {toast.message}
          </Alert>
        </Snackbar>}
      {props.children}
    </ToastContext.Provider>
  );
};
