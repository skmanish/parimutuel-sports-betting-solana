import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Section3Points from './section-3-points';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '40px', 
    lineHeight: '48px',
    color: '#FFFFFF',
    textAlign: 'left',
});
const TitleBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '1.6rem', 
    lineHeight: '1.75rem',
    color: '#FFFFFF',
    textAlign: 'center',
});

export default function Section3() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box 
            sx={{backgroundColor: '#021F49'}} 
            py={{xs: 5}}
            px={{xs: 3, sm: 5, md: 12, lg: 15, xl: 18}}
            display='flex'
            flexDirection='row'
            textAlign='center'
            alignItems='center'
            justifyContent='space-between'
        >
            <Box sx={{width: '45%'}} display='flex' flexDirection='column'>
                {bigScreen? <TitleBox>Why Swoop?</TitleBox>: <TitleBoxPhone>Why Swoop?</TitleBoxPhone>}
                <Section3Points />
            </Box>
            <img 
            src={process.env.PUBLIC_URL + 'images/section_3_app.png'} 
            alt='App'
            style={{maxHeight: '60vh', maxWidth: '45%'}} />

        </Box>
    );
}