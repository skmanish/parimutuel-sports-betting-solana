import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from '@mui/material/Divider';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
    lineHeight: '1.8rem',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
});
const QuarterTargetBoxPhone = styled(Box)({
    fontWeight: 300, 
    fontSize: '0.8rem', 
    lineHeight: '1.375rem',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
});

export default function Section4GridItem(props: {
    quarter: string,
    targets: string[],
    isCurrent?: boolean,
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
            {props.targets.map((target)=>{
                return (
                    <>
                    {bigScreen?
                        <QuarterTargetBox>
                            <CheckBoxIcon sx={{pr: 1}}/>
                            {target}
                        </QuarterTargetBox>:
                        <QuarterTargetBoxPhone>
                            <CheckBoxIcon sx={{pr: 1}}/>
                            {target}
                        </QuarterTargetBoxPhone>
                    }
                    </>
                );
            })}
        </ContainerBox>
    );
}