import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '1.5rem', 
    lineHeight: '1.375rem',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: '5px',
    marginRight: '10px',
});

const DescriptionBox = styled(Box)({
    fontWeight: 400, 
    fontSize: '1.0rem', 
    lineHeight: '1.375rem',
    color: '#E3E3E3',
    textAlign: 'left',
    marginTop: '5px',
    marginRight: '10px',
});

export default function Section2HorizontalTile(
    props: {imageUrl: string, 
    title: string,
    description: string}) 
{
    return(
        <Box py={{xs: 2, md: 5}} px={{xs: 2, md: 4}} display='flex' flexDirection='row'>
            <Stack sx={{width: '60%'}}>
                <TitleBox>{props.title}</TitleBox>
                <DescriptionBox>{props.description}</DescriptionBox>
            </Stack>
            <img 
            src={props.imageUrl} 
            alt={props.title}
            style={{width: '40%', height: 'auto'}} />
        </Box>
    );
};