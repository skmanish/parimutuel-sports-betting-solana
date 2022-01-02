/* eslint-disable require-jsdoc */
// import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import {EventMetadata} from '../../types/event';

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EventStatesAndActionsBox(
    props: {event: EventMetadata},
) {
  const {event} = props;
  const eventOptions = [
    event.eventOption1,
    event.eventOption2,
    event.eventOption3,
    event.eventOption4,
    event.eventOption5,
  ];
  return (
    <Box sx={{display: 'flexbox'}}>
      <Paper sx={{
        margin: 1,
        padding: 2,
        alignItems: 'center',
      }}>
        <Stack spacing={2} sx={{alignItems: 'center'}}>
          <Typography variant='body2' color='text.secondary'>
            {event.eventQuestion}
          </Typography>
          <Divider light style={{width: '100%'}}/>
          <Stack
            direction='row'
            spacing={2}
            sx={{justifyContent: 'space-evenly'}}>
            {
              eventOptions.map(function(eventOption: string) {
                if (eventOption.length) {
                  return (<Item>{eventOption}</Item>);
                } else {
                  return (<></>);
                }
              })
            }
          </Stack>
          <Divider light style={{width: '100%'}}/>
          <Button variant="outlined"
            onClick={() => {}}>
              Start event
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
