import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Section1Intro() {
    return(
    <Stack>
    <Typography variant="h2" >
        <Box sx={{ fontWeight: 700, fontSize: '56px', lineHeight: '67.77px' }}>
            Fantasy Cricket On Web3.0 
        </Box>
    </Typography>
    <Typography variant='h5' sx={{mt: 2}}>
        <Box sx={{ fontWeight: 400, fontSize: '22px', lineHeight: '33px' }}>
            The world's first scalable and decentralized platform for fantasy
             cricket powered by Solana and Serum.
        </Box>    
    </Typography>
    <Box sx={{mt: 3, flexDirection: 'row', alignItems: 'center'}}>
        <img 
            src={process.env.PUBLIC_URL + 'images/solana_s_white.png'} 
            alt='Solana'
            style={{width: 'auto', height: '25px'}} 
        />
        <img 
            src={process.env.PUBLIC_URL + 'images/serum_white.png'} 
            alt='Solana'
            style={{width: 'auto', height: '25px', marginLeft: '10px'}} 
        />
        <Typography variant='h6' sx={{px: 3}}>
            <Box sx={{ fontWeight: 400, fontSize: '18px', lineHeight: '25px' }}>
                Launching in IPL 2022
            </Box>
        </Typography>
    </Box>
    <Button variant="outlined" sx={{mt: 3, maxWidth: '150px'}} size='small'>
        Sign up for Beta
    </Button>
    </Stack>);
}