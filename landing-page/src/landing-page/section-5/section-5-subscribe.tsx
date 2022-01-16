import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '24px', 
    lineHeight: '30px',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    marginBottom: '25px',
});
const TitleBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '24px', 
    lineHeight: '30px',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    marginBottom: '25px',
});

export default function Section5Subscribe() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));        
    return (
        <Box sx={{p: 2}} display='flex' flexDirection='column' alignItems='center'>
        {bigScreen?
            <TitleBox>Stay updated</TitleBox>:
            <TitleBoxPhone>Stay updated</TitleBoxPhone>
        }
        <Stack direction='row'>
            <TextField size="small" label="Email" variant="outlined" sx={{mr: 2}}/>
            <Button variant="outlined" size='small'>Subscribe</Button>
        </Stack>
        </Box>
    );

}