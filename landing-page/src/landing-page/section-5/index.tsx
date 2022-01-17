import Box from '@mui/material/Box';
import Section5GetInTouch from './section-5-get-in-touch';
import Section5Subscribe from './section-5-subscribe';
import Grid from '@mui/material/Grid';

export default function Section5(){
    return(
        <Box 
            sx={{backgroundColor: '#021F49'}} 
            px={{xs: 3, sm: 5, md: 12, lg: 15, xl: 18}}
            pt={2}
            pb={2}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
        >
            <Grid container spacing={2} justifyContent="space-between" alignItems="stretch">
                <Grid item xs={12}>
                    <Section5Subscribe />
                </Grid>
                {/* <Grid item xs={12}>
                    <Section5GetInTouch />
                </Grid> */}
            </Grid>
            <Box sx={{
                fontWeight: 400, 
                fontSize: '0.9rem', 
                lineHeight: '1.2rem', 
                textAlign: 'center',
                color: '#E3E3E3AA',
                margin: 1,
                marginTop: 2,
            }}>
                Copyright © Swoop Technology Limited. All rights reserved.
            </Box>
        </Box>
    );
};