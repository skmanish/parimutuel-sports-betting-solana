import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/styles';
import React from 'react';
import Section1Intro from './section-1-intro';
import Section1Navbar from './section-1-navbar';
import Section1SlidingPhoneAndShadow from './section-1-sliding-phone-and-shadow';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ColorGradientBox = styled(Box)({
    background: 'linear-gradient(255.48deg, #0E90A9 11.59%, #002255 93.73%);',
    border: 0,
    color: 'white',
    height: '100vh',
    zIndex: 0,
    position: 'relative',
    top: '0px',
    left: '0px',
  });

export default function Section1() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const containerRef = React.useRef(null);
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
    <Stack 
        px={{xs: 3, sm: 5, md: 12, lg: 15, xl: 18}} 
        py={3} 
        sx={{display: 'flex', height: '100%'}} 
        ref={containerRef}
    >
        <Section1Navbar />
        {bigScreen &&
            <Box sx={{
                flexGrow: 1, 
                display: 'flex',  
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Box sx={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Section1Intro />
                </Box>
                <Box sx={{
                    width: '50%', 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center', 
                    flexDirection: 'row'
                }}>
                    <Section1SlidingPhoneAndShadow containerRef={containerRef}/>
                </Box>
            </Box>
        }
        {!bigScreen &&
            <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Box sx={{
                    height: '55%', 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center', 
                    m: 'auto',
                    flexDirection: 'column'
                }}>
                    <Section1SlidingPhoneAndShadow containerRef={containerRef}/>
                </Box>
                <Box sx={{height: '45%', pt: 2, display: 'flex'}}>
                    <Section1Intro />
                </Box>
            </Box>
        }
    </Stack>
    </ColorGradientBox>
    );
}