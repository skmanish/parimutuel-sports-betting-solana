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
    lineHeight: '19px',
});

const NavbuttonsTypography = styled(Typography)({
    fontWeight: 500,
    fontSize: '17px',
    lineHeight: '19px',
    textTransform: 'none',
    color: '#ffffff',
    minWidth: '0px',
})

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
                        <NavbuttonsTypography>About Us</NavbuttonsTypography>
                    </ButtonContainer>
                    <ButtonContainer>
                        <NavbuttonsTypography>How to play</NavbuttonsTypography>
                    </ButtonContainer>
                    <ButtonContainer>
                        <NavbuttonsTypography>FAQs</NavbuttonsTypography>
                    </ButtonContainer>
                    <Button variant="outlined" sx={{ml: 1, maxWidth: '150px'}} size='medium'>
                        <NavbuttonsTypography>Devnet MVP</NavbuttonsTypography>
                    </Button>
                </Box>
            }
        </Box>
    )
}