import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const OvalShadowBox = styled(Box)({
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(99, 205, 209, 0.63) 51.04%, rgba(68, 158, 175, 0.8) 65.57%, rgba(14, 144, 169, 0.12) 100%, rgba(14, 144, 169, 0.12) 100%, rgba(14, 144, 169, 0.0) 100%)',
    filter: 'blur(8px)', 
});

export default function Section1SlidingPhoneAndShadow(
    containerRef: any
) {
    const [phoneAnimationState, setPhoneAnimationState] = React.useState(false);
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const phoneHeight = bigScreen? '60vh': '40vh';
    const ovalShadowOffset = '-10vh';
    const ovalShadowHeight = bigScreen? '100px': '100px';

    React.useEffect(() => {
        // Update the document title using the browser API
        setPhoneAnimationState(true);
    }, []);
    return (
        <Slide direction="up" in={phoneAnimationState} container={containerRef.current} timeout={800}>
            <Box sx={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end'}}>
            <OvalShadowBox sx={{width: '100%', height: ovalShadowHeight, mt: ovalShadowOffset}}/>
            <img
            src={process.env.PUBLIC_URL + 'images/section_1_app_mockup.png'}
            style={{height: phoneHeight, width: 'auto', zIndex: 1}}
            alt='Swoop_app'/>
            </Box>
        </Slide>
    );
}