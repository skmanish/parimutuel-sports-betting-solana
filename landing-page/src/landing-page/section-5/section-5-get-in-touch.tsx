import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

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

export default function Section5GetInTouch() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));        
    return (
        <Box sx={{p: 2}} display='flex' flexDirection='column' alignItems='center'>
        {bigScreen?
            <TitleBox>Get in Touch</TitleBox>:
            <TitleBoxPhone>Get in Touch</TitleBoxPhone>
        }
        <Stack direction='row' spacing={2}>
            <img src={process.env.PUBLIC_URL + 'images/social-twitter.svg'} alt='twitter'/>
            <img src={process.env.PUBLIC_URL + 'images/social-discord.svg'} alt='discord'/>
            <img src={process.env.PUBLIC_URL + 'images/social-telegram.svg'} alt='telegram'/>
            <img src={process.env.PUBLIC_URL + 'images/social-medium.svg'} alt='medium'/>
        </Stack>
        </Box>
    );

}