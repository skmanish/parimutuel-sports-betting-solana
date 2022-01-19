import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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

export default function NotFoundPage() {
    return(
        <ColorGradientBox sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                fontSize: '200px',
                fontWeight: 700,
                color: '#E3E3E3'
            }}>
                404
            </Box>
            <Box sx={{
                fontSize: '50px',
                fontWeight: 400,
                color: '#E3E3E3'
            }}>
                Not found
            </Box>
            <Box sx={{
                fontSize: '18px',
                marginTop: '20px',
                color: '#E3E3E3A0',
                width: '350px',
                textAlign: 'center'
            }}>
                The page you are looking for could not be found on this server.
            </Box>
        </ColorGradientBox>
    );
}