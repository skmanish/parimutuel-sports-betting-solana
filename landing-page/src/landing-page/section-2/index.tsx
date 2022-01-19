import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Section2HorizontalTile from './section-2-horizontal-tile';
import Section2VerticalTile from './section-2-vertical-tile';

export default function Section2() {
    const titleText = 'Steps For Playing';
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const imageUrls = [
        process.env.PUBLIC_URL + 'images/section_2_select_match.png',
        process.env.PUBLIC_URL + 'images/section_2_create_team.png',
        process.env.PUBLIC_URL + 'images/section_2_join_contests.png',
    ];
    const titles = [
        'Select a Match',
        'Create Team',
        'Join Contests',
    ];
    const descriptions = [
        'Choose an upcoming IPL match to participate',
        'Use your skills to pick the right players',
        'Choose between different contests and swoop your winnings in crypto',
    ];
    return (
        <Box 
            sx={{backgroundColor: '#002255'}} 
            px={{xs: 3, sm: 5, md: 12, lg: 15, xl: 18}}
            py={{xs: 5}}
            display='flex'
            flexDirection='column'
            textAlign='center'
        >
            <Box sx={{
                fontWeight: 700, 
                fontSize: bigScreen?'40px':'1.6rem', 
                lineHeight: bigScreen?'48px':'1.75rem',
                color: 'white',
                marginBottom: 1,
            }}>{titleText}</Box>
            {bigScreen &&
                <Box display='flex' flexDirection='row'>
                    <Section2VerticalTile 
                        imageUrl={imageUrls[0]} 
                        title={titles[0]} 
                        description={descriptions[0]}
                    />
                    <Section2VerticalTile 
                        imageUrl={imageUrls[1]}
                        title={titles[1]}
                        description={descriptions[1]}
                    />
                    <Section2VerticalTile 
                        imageUrl={imageUrls[2]}
                        title={titles[2]}
                        description={descriptions[2]}
                    />
                </Box>
            }
            {!bigScreen &&
                <Box display='flex' flexDirection='column'>
                    <Section2HorizontalTile 
                        imageUrl={imageUrls[0]} 
                        title={titles[0]} 
                        description={descriptions[0]}
                    />
                    <Section2HorizontalTile 
                        imageUrl={imageUrls[1]}
                        title={titles[1]}
                        description={descriptions[1]}
                    />
                    <Section2HorizontalTile 
                        imageUrl={imageUrls[2]}
                        title={titles[2]}
                        description={descriptions[2]}
                    />
                </Box>
            }
        </Box>
    )
};