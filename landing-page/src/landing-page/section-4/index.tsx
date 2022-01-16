import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Section4GridItem from './section-4-grid-item';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '40px', 
    lineHeight: '48px',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    marginBottom: '25px',
});
const TitleBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '1.6rem', 
    lineHeight: '1.75rem',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    marginBottom: '25px',
});

export default function Section4() {
    const quarters = ['Q4 2021', 'Q1 2022', 'Q2 2022', 'Q3 2022'];
    const targets = [
        ['Idea Conceptualized', 'Development of POC on Devnet'],
        ['Raise Seed', 'Launch Fantasy Cricket', 'Sponsor prizes for IPL'],
        ['Iteratively Improve Platform', 'Mint token', 'List on Exchange'],
        ['Grow user base', 'Partner with Cricket Teams'],
    ]
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box 
            sx={{backgroundColor: '#002255'}} 
            py={{xs: 5}}
            px={{xs: 3, sm: 5, md: 12, lg: 15, xl: 18}}
            display='flex'
            flexDirection='column'
            textAlign='center'
            alignItems='center'
            justifyContent='space-between'
        >
            {bigScreen?
                <TitleBox>Project Roadmap</TitleBox>:
                <TitleBoxPhone>Project Roadmap</TitleBoxPhone>
            }
            <Grid container spacing={2} justifyContent="space-between" alignItems="stretch">
            <Grid item xs={12} sm={6} md={3}>
                <Section4GridItem quarter={quarters[0]} targets={targets[0]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Section4GridItem quarter={quarters[1]} targets={targets[1]} isCurrent/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Section4GridItem quarter={quarters[2]} targets={targets[2]} isFuture/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Section4GridItem quarter={quarters[3]} targets={targets[3]} isFuture/>
            </Grid>
            </Grid>
        </Box>
    );
}