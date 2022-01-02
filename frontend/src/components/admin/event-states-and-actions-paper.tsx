/* eslint-disable require-jsdoc */
// import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import {EventMetadata, EventState} from '../../types/event';
import {useState} from 'react';
import {useWallet} from '@solana/wallet-adapter-react';
import {eventsApi} from '../../api';

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const eventStateToNextActionText = {
  0: 'Start Event',
  1: 'End Event',
  2: 'Resolve Event',
};

export default function EventStatesAndActionsBox(
    props: {event: EventMetadata},
) {
  const {event} = props;
  const wallet = useWallet();
  const [eventState, setEventState] = useState<EventState>(
    event.eventState as EventState);

  const [correctOptionText, setCorrectOptionText] = useState('');
  const [correctOptionNumber, setCorrectOptionNumber] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const eventOptions = [
    event.eventOption1,
    event.eventOption2,
    event.eventOption3,
    event.eventOption4,
    event.eventOption5,
  ];
  const onClickButton = async () => {
    setSubmitting(true);
    if (eventState == EventState.CREATED) {
      // @ts-ignore
      await eventsApi.startEvent(event, wallet);
    } else if (eventState == EventState.STARTED) {
      // @ts-ignore
      await eventsApi.endEvent(event, wallet);
    } else if (eventState == EventState.ENDED) {
      if (correctOptionNumber <1 || correctOptionNumber >5 ||
         eventOptions[correctOptionNumber-1] != correctOptionText ||
         eventOptions[correctOptionNumber-1] == ''
      ) {
        console.log('Please check correct option text and number');
      } else {
        // @ts-ignore
        await eventsApi.resolveEvent(event, wallet, correctOptionNumber);
      }
    }
    setEventState(event.eventState as EventState);
    setSubmitting(false);
  };
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
              eventOptions.map(function(eventOption: string, index: Number) {
                if (eventOption.length) {
                  return (<Item key={index+''}>{eventOption}</Item>);
                } else {
                  return (<div key={index+''} />);
                }
              })
            }
          </Stack>
          <Divider light style={{width: '100%'}}/>
          {eventState==EventState.ENDED &&
          <Stack spacing={2} direction='row'>
            <TextField
              label="Correct Option Text"
              size='small'
              onChange={(event)=>{
                setCorrectOptionText(event.target.value);
              }}
              variant="outlined" />
            <TextField
              label="Correct Option Number (1-indexed)"
              size='small'
              onChange={(event)=>{
                setCorrectOptionNumber(
                    parseInt(event.target.value));
              }}
              variant="outlined" />
            <Divider light style={{width: '100%'}}/>
          </Stack>}
          {eventState!=EventState.RESOLVED &&
          <Button variant="outlined"
            onClick={onClickButton}
            disabled={submitting}>
            {eventStateToNextActionText[eventState]}
          </Button>}
        </Stack>
      </Paper>
    </Box>
  );
}
