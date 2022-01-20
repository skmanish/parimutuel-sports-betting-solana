import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import Section1SignupDialog from './section-1-signup-dialog';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '80px', 
    lineHeight: '95px',
    textTransform: 'none',
    letterSpacing: '3px',
});
const TitleBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '2.5rem', 
    lineHeight: '3.0rem',
    textAlign: 'center',
    textTransform: 'none',
});
const DescriptionBox = styled(Box)({
    fontWeight: 400, 
    fontSize: '22px', 
    lineHeight: '40px',
    color: '#E3E3E3',
});
const DescriptionBoxPhone = styled(Box)({
    fontWeight: 400, 
    fontSize: '1.0rem', 
    lineHeight: '1.75rem',
    textAlign: 'center',
    color: '#E3E3E3',
});
const LaunchingIPLBox = styled(Box)({
    fontWeight: 400, 
    fontSize: '24px', 
    lineHeight: '20px',
    letterSpacing: '0px',
    color: '#E3E3E3',
});
const LaunchingIPLBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '1.0rem', 
    lineHeight: '20px',
    letterSpacing: '0px',
});

export default function Section1Intro() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const titleText = 'Fantasy Cricket On Solana';
    const descriptionText = "The world's first scalable and decentralized "+
        "platform for fantasy cricket.";
    const launchingIPLText = 'Launching in IPL 2022';
    const itemsAlignment = bigScreen? 'flex-start': 'center';
    const [signUpDialogOpen, setSignUpDialogOpen] = useState(false); 
    return(
    <Box sx={{display: 'flex', alignItems: itemsAlignment}}>
    <Typography variant="h2" >
        {bigScreen?
            <TitleBox> {titleText} </TitleBox>:
            <TitleBoxPhone> {titleText} </TitleBoxPhone>
        }
    </Typography>
    <Typography variant='h5' mt={{xs: 2, md: 4}}>
        {bigScreen?
            <DescriptionBox> {descriptionText} </DescriptionBox>:
            <></>
        }
    </Typography>
    <Box mt={{xs: 1, md: 4}} sx={{flexDirection: 'row', alignItems: 'center'}}>
        <img 
            src={process.env.PUBLIC_URL + 'images/solana_s_white.png'} 
            alt='Solana'
            style={{width: 'auto', height: '25px'}} 
        />
        <img 
            src={process.env.PUBLIC_URL + 'images/serum_white.png'} 
            alt='Solana'
            style={{width: 'auto', height: '25px', marginLeft: '10px'}} 
        />
        <img 
            src={process.env.PUBLIC_URL + 'images/ipl-resized.png'} 
            alt='IPL'
            style={{width: 'auto', height: '30px', marginLeft: '10px', backgroundColor: '#ffffff',}} 
        />
        <Typography variant='h6' pl={{xs: 2, md: 2}}>
            {bigScreen?
                <LaunchingIPLBox> {launchingIPLText} </LaunchingIPLBox>:
                <LaunchingIPLBoxPhone> {launchingIPLText} </LaunchingIPLBoxPhone>
            }
        </Typography>
    </Box>
    <Button 
        variant="outlined" 
        sx={{mt: 3, maxWidth: '200px'}} 
        size='large'
        onClick={()=>setSignUpDialogOpen(true)}
    >
        Sign up for Beta
    </Button>
    <Section1SignupDialog open={signUpDialogOpen} setOpen={setSignUpDialogOpen}/>
    </Box>);
}