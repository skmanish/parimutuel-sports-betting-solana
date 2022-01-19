import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { signUpForBeta } from '../../api';
import { CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '24px', 
    lineHeight: '30px',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    marginBottom: '25px',
});
const TitleBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '24px', 
    lineHeight: '30px',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    marginBottom: '25px',
});

export default function Section5Subscribe() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
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
    const subscribeAction = async () => {
        setLoading(1);
        await signUpForBeta(email);
        setLoading(2);
    }   
    return (
        <Box sx={{p: 2}} display='flex' flexDirection='column' alignItems='center'>
        {bigScreen?
            <TitleBox>Stay updated</TitleBox>:
            <TitleBoxPhone>Stay updated</TitleBoxPhone>
        }
        <Stack direction='row'>
            <TextField 
                size="small"
                label="Email"
                variant="outlined" 
                sx={{mr: 2}}
                value={email}
                onChange={(v) => {
                    setEmail(v.target.value);
                    validateEmail(v.target.value);
                }}
                type="email"
            />
            {loading===0 && <Button 
                variant="outlined"
                size='small'
                disabled={!emailValid}
                onClick={subscribeAction}
            > Subscribe
            </Button>}
            {loading===1 && <CircularProgress />}
            {loading===2 && 
            <Button variant="outlined" size="small" disabled={true} >
            <CheckCircleIcon sx={{mr: 1}}/> Subscribed
            </Button>}
        </Stack>
        </Box>
    );

}