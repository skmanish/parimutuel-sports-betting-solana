import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const TitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '24px', 
    lineHeight: '30px',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: '20px',
});

const DescriptionBox = styled(Box)({
    fontWeight: 400, 
    fontSize: '16px', 
    lineHeight: '24px',
    color: '#E3E3E3',
    textAlign: 'left',
    marginTop: '20px',
});

export default function Section2VerticalTile(
    props: {imageUrl: string, 
    title: string,
    description: string}) 
{
    return(
        <Box py={{xs: 3, md: 5}} px={{xs: 2, md: 4}}>
            <img 
            src={props.imageUrl} 
            alt={props.title}
            style={{width: '100%', height: 'auto'}} />
            <TitleBox>{props.title}</TitleBox>
            <DescriptionBox>{props.description}</DescriptionBox>
        </Box>
    );
};