import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import { signUpForBeta } from "../../api";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function Section1SignupDialog(props: {
    open: boolean,
    setOpen: (open: boolean) => void,
}) {
    // 3 possible states: 0: Initial, 1: Registering, 2: Registered.
    const [loading, setLoading] = useState(0);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    
    const validateEmail = (email: string) => {
        setEmailValid(String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) != null);
    };
    const signUpAction = async () => {
        setLoading(1);
        await signUpForBeta(email);
        setLoading(2);
        // Automatically close the dialog
        setTimeout(()=>{
            props.setOpen(false);
        }, 2000);
        setTimeout(()=>{
            setLoading(0);
            setEmail('');
        }, 2500);
    }
    return(
        <Dialog 
            open={props.open} 
            onClose={()=>props.setOpen(false)}
            PaperProps={{
                style: { 
                    borderRadius: 10,
                    backgroundColor: '#002255',
                    color: '#E3E3E3'
                }   
            }}
        >
        <DialogTitle id="alert-dialog-title">
          We are launching in April 2022
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            As a beta user, you will have priority access
            to all our events, tokens, notifications and NFTs.
          </DialogContentText>
        </DialogContent>
        <Box 
                display='flex'
                flexDirection='row'
                justifyContent='flex-start'
                alignItems='center'
                sx={{
                    px: 3,
                    pb: 3,
                    mt: 1,
                    color: '#5ce1e6',
                }}
            >
        {
            loading === 0 &&
            <>
                <TextField
                    autoFocus
                    size='small'
                    sx={{flexGrow: 1}}
                    value={email}
                    onChange={(v) => {
                        setEmail(v.target.value);
                        validateEmail(v.target.value);
                    }}
                    label="Email Address"
                    type="email"
                    variant="outlined"
                />
                <Button disabled={!emailValid} onClick={signUpAction}>Sign Up For Beta</Button>
            </>
        }
        {
            loading === 1 &&
            <CircularProgress />
        }
        {
            loading === 2 &&
            <>
                <CheckCircleIcon sx={{mr: 1}}/>
                Thank you! We will keep you updated. 
            </>
        }
        </Box>
      </Dialog>
    );
}