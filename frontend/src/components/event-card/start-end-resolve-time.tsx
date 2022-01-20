import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {styled} from '@mui/material/styles';
import {EventMetadata} from '../../types/event';

const HeaderBox = styled(Box)({
  fontWeight: 500,
  textAlign: 'center',
  fontSize: '0.9rem',
});

const DateTimeBox = styled(Box)({
  fontWeight: 400,
  textAlign: 'center',
  color: '#667a99',
  fontSize: '0.8rem',
});

/* eslint-disable require-jsdoc */
export default function StartEndResolveTime(props: {
    inputEvent: EventMetadata,
}) {
  const event = props.inputEvent;
  const amOrPm = (time: Date) => {
    return (new Date(time)).getHours() >= 12? 'AM': 'PM';
  };
  const getTimeString = (time: Date) => {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
      'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let hours = (new Date(time)).getHours();
    hours = hours > 12? hours - 12 : hours;
    const hourString = hours < 10? '0'+hours: hours;
    const minutes = (new Date(time)).getMinutes();
    const minutesString = minutes < 10? '0'+minutes: minutes;
    return (
      (new Date(time)).getDay() + ' ' +
      months[(new Date(time)).getMonth()] + ', ' +
      hourString + ':' + minutesString + ' ' + amOrPm(time));
  };
  return (
    <Box>
      <Divider sx={{background: '#334e77', my: 1}} variant="fullWidth" />
      <Box display='flex' flexDirection='row'
        sx={{color: '#334e77'}}
      >
        <Box display='flex' flexDirection='column' sx={{width: '33%'}}>
          <HeaderBox>STARTS AT</HeaderBox>
          <DateTimeBox>{getTimeString(event.eventStartTime)}</DateTimeBox>
        </Box>
        <Box display='flex' flexDirection='column' sx={{width: '33%'}}>
          <HeaderBox>ENDS AT</HeaderBox>
          <DateTimeBox>{getTimeString(event.eventEndTime)}</DateTimeBox>
        </Box>
        <Box display='flex' flexDirection='column' sx={{width: '33%'}}>
          <HeaderBox>RESOLVES AT</HeaderBox>
          <DateTimeBox>{getTimeString(event.eventResolveTime)}</DateTimeBox>
        </Box>
      </Box>
      <Divider sx={{background: '#334e77', mt: 1}} variant="fullWidth" />
    </Box>
  );
}
