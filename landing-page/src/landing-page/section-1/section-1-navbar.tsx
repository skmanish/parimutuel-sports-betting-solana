import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {styled, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ButtonContainer = styled(Button)({
    textTransform: 'none',
    color: 'white',
    fontWeight: 500, 
    fontSize: '16px', 
    lineHeight: '19px'
});

export default function Section1Navbar() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box sx={{
            display: 'flex', 
            width: '100%', 
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <img 
              src={process.env.PUBLIC_URL + 'images/logo_light_400.png'} 
              alt='swoop_logo'
              style={{width: '150px'}} />
            {bigScreen &&
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <ButtonContainer>
                        <Typography variant='body2'>About Us</Typography>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Typography variant='body2'>How to play</Typography>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Typography variant='body2'>FAQs</Typography>
                    </ButtonContainer>
                    <Button variant="outlined" sx={{ml: 1, maxWidth: '150px'}} size='small'>
                        Devnet MVP
                    </Button>
                </Box>
            }
        </Box>
    )
}