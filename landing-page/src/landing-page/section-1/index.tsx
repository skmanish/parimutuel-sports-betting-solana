import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/styles';
import Section1Intro from './section-1-intro';
import Section1Navbar from './section-1-navbar';

const ColorGradientBox = styled(Box)({
    background: 'linear-gradient(57.03deg, #002255 -5.48%, #0E90A9 144.23%)',
    border: 0,
    color: 'white',
    height: '100vh',
    zIndex: 0,
    position: 'relative',
    top: '0px',
    left: '0px',
  });

export default function Section1() {
    return(
    <ColorGradientBox>
    <img 
    src={process.env.PUBLIC_URL + 'images/stadium.png'} 
    style={{
        width:'100vw', 
        height:'100vh',
        opacity: 0.25,
        zIndex: -1,
        position: 'absolute',
        top: '0px',
        left: '0px',
    }} 
    alt='stadium'/>
    <Stack px={18} py={3} sx={{display: 'flex', height: '100%'}}>
        <Section1Navbar />
        <Box sx={{flexGrow: 1, display: 'flex'}}>
            <Box sx={{width: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Section1Intro />
            </Box>
            <Box sx={{width: '45%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 'auto'}}>
                <img
                src={process.env.PUBLIC_URL + 'images/section_1_app_mockup.png'}
                style={{height: '60vh', width: 'auto'}}
                alt='Swoop_app'/>
            </Box>
        </Box>
    </Stack>
    </ColorGradientBox>
    );
}