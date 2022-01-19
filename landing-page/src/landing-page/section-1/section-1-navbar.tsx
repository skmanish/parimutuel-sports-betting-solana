import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {styled, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from './logo';

const ButtonContainer = styled(Button)({
    textTransform: 'none',
    color: 'white',
    fontWeight: 500, 
    fontSize: '16px', 
    lineHeight: '19px',
});

const NavbuttonsTypography = styled(Typography)({
    fontWeight: 400,
    fontSize: '17px',
    lineHeight: '19px',
    textTransform: 'none',
    color: '#ffffff',
    minWidth: '0px',
})

export default function Section1Navbar() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const scrollToSection = (sectionNumber: number) => {
        const totalHeight = document.body.offsetHeight;
        const viewportHeight = Math.max(
            document.documentElement.clientHeight || 0, window.innerHeight || 0)
        if (sectionNumber === 1) {
            window.scrollTo(
                { top: viewportHeight, behavior: 'smooth' })
        } else if (sectionNumber === 2) {
            window.scrollTo(
                { top: (totalHeight)/2, behavior: 'smooth' })
        } else {
            window.scrollTo(
                { top: totalHeight, behavior: 'smooth' })
        }
    }
    return (
        <Box sx={{
            display: 'flex', 
            width: '100%', 
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Logo />
            {bigScreen &&
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <ButtonContainer onClick={()=>scrollToSection(2)}>
                        <NavbuttonsTypography>About Us</NavbuttonsTypography>
                    </ButtonContainer>
                    <ButtonContainer onClick={()=>scrollToSection(1)}>
                        <NavbuttonsTypography>How to play</NavbuttonsTypography>
                    </ButtonContainer>
                    <ButtonContainer onClick={()=>scrollToSection(3)}>
                        <NavbuttonsTypography>Roadmap</NavbuttonsTypography>
                    </ButtonContainer>
                    <Button 
                        variant="outlined" 
                        sx={{ml: 1}} 
                        size='large'
                        onClick={() => {
                            window.location.href = (
                                window.location.href[window.location.href.length - 1] === '/'?
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