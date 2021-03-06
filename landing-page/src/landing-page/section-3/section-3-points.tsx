import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const DescriptionBox = styled(Box)({
    fontWeight: 400, 
    fontSize: '22px', 
    lineHeight: '24px',
    color: '#E3E3E3',
    textAlign: 'left',
});
const DescriptionBoxPhone = styled(Box)({
    fontWeight: 400, 
    fontSize: '12px', 
    lineHeight: '18px',
    textAlign: 'left',
    color: '#E3E3E3',
});

export default function Section3Points() {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const points = [
        'No registration or disclosure of personal info. Solana wallet is the only requirement.',
        'Competitive Fee Structure - Swoop fees <1%',
        'Trustless & transparent - Oracle driven resolutions',
        'Teams, winners and prizes fully auditable',
        'No lock up periods',
    ];
    return(
        <Box 
            sx={{flexGrow: 1}}
            py={{xs: 2, md: 4}} 
            display='flex' 
            flexDirection='column' 
            justifyContent='space-between'
        >
            {points.map((point, index) => {
                return (
                    <Box key={index} display='flex' flexDirection='row' alignItems='flex-start' py={1} >
                        {bigScreen?
                            <>
                                <ArrowRightIcon color='primary' fontSize='large'/>
                                <DescriptionBox>{point}</DescriptionBox>
                            </>:
                            <>
                                <ArrowRightIcon color='primary' fontSize='medium'/>
                                <DescriptionBoxPhone>{point}</DescriptionBoxPhone>
                            </>
                        }
                    </Box>
                );
            })}
        </Box>
    );

}