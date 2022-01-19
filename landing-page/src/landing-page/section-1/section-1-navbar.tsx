import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {styled, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useNavigate} from 'react-router-dom';

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
    const navigate = useNavigate();
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
                    <Button 
                        variant="outlined" 
                        sx={{ml: 1}} 
                        size='large'
                        onClick={() => {
                            window.location.href = (
                                window.location.href[window.location.href.length - 1] == '/'?
                                window.location.href + 'bet':
                                window.location.href + '/bet'
                            );
                        }}
                    >
                        <NavbuttonsTypography>Devnet MVP</NavbuttonsTypography>
                    </Button>
                </Box>
            }
        </Box>
    )
}