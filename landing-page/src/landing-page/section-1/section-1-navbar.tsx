import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Section1Navbar() {
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
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Button sx={{textTransform: 'none'}}>
                    <Typography variant='body2'>About Us</Typography>
                </Button>
                <Button sx={{textTransform: 'none'}}>
                    <Typography variant='body2'>How to play</Typography>
                </Button>
                <Button sx={{textTransform: 'none'}}>
                    <Typography variant='body2'>FAQs</Typography>
                </Button>
                <Button variant="outlined" sx={{ml: 1, maxWidth: '150px'}} size='small'>
                    Devnet MVP
                </Button>
            </Box>
        </Box>
    )
}