import Box from '@mui/material/Box';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from '@mui/material/Divider';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircularProgress from "@mui/material/CircularProgress";

const ContainerBox = styled(Box)({
    backgroundColor: '#FFFFFF20',
    paddingTop: 10,
    paddingLeft: 10,
    border: '20px',
    borderRadius: '10px',
    borderColor: '#E3E3E3',
    height: "100%",
});

const QuarterTitleBox = styled(Box)({
    fontWeight: 700, 
    fontSize: '1.5rem', 
    lineHeight: '1.375rem',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
});
const QuarterTitleBoxPhone = styled(Box)({
    fontWeight: 700, 
    fontSize: '1.5rem', 
    lineHeight: '1.375rem',
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});
const QuarterTargetBox = styled(Box)({
    fontWeight: 300, 
    fontSize: '0.8rem', 
    lineHeight: '1.375rem',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'flex-start',
    textAlign: 'left',
});
const QuarterTargetBoxPhone = styled(Box)({
    fontWeight: 300, 
    fontSize: '0.8rem', 
    lineHeight: '1.375rem',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'flex-start',
    textAlign: 'left',
});

const getIcon = (isCurrent?: boolean, isFuture?: boolean) => {
    if (isCurrent) {
        return(<CircularProgress size='1rem' sx={{mr: 2}}/>);
    } else if (isFuture) {
        return(<CheckBoxOutlineBlankIcon fontSize='small' sx={{mr: 1}}/>);
    } else {
        return(<CheckBoxIcon sx={{mr: 1}}/>);
    }
}

export default function Section4GridItem(props: {
    quarter: string,
    targets: string[],
    isCurrent?: boolean,
    isFuture?: boolean,
}) {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <ContainerBox>
            {bigScreen?
                <QuarterTitleBox>
                    <DateRangeIcon fontSize='large' sx={{pr: 2}}/>
                    {props.quarter}
                </QuarterTitleBox> :
                <QuarterTitleBoxPhone>
                    <DateRangeIcon fontSize="medium" sx={{pr: 2}}/>
                    {props.quarter}
                </QuarterTitleBoxPhone>
            }
            <Divider light sx={{m: 1}} />
            <Box p={1}>
            {props.targets.map((target, index)=>{
                return (
                    <Box key={index}>
                    {bigScreen?
                        <QuarterTargetBox>
                            {getIcon(props.isCurrent, props.isFuture)}
                            {target}
                        </QuarterTargetBox>:
                        <QuarterTargetBoxPhone>
                            {getIcon(props.isCurrent, props.isFuture)}
                            {target}
                        </QuarterTargetBoxPhone>
                    }
                    </Box>
                );
            })}
            </Box>
        </ContainerBox>
    );
}