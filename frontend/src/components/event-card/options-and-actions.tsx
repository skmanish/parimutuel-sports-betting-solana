/* eslint-disable require-jsdoc */
import {EventMetadata} from '../../types/event';
import {
  getValidOptions,
  getValidOptionsPercentageStakes,
} from '../../utils/event-utils';
import {
  Typography,
  Divider,
  Stack,
  Button,
  Box,
} from '@mui/material';
import LinearProgressWithLabel from './progress-with-label';

export default function EventCardOptionsAndActions(
    props: {event: EventMetadata},
) {
  const {event} = props;
  const validOptionsText: string[] = getValidOptions(event);
  const validOptionsPercentageStakes: number[
  ] = getValidOptionsPercentageStakes(event);
  return (
    <Stack spacing={1} sx={{width: '100%'}}>
      <Divider light style={{width: '100%'}}/>
      {validOptionsText.map((option, index)=>(
        <div key={index}>
          <Stack
            spacing={1}
            direction='row'
            sx={{display: 'flex', width: '100%'}}>
            <Box
              display='flex'
              sx={{flexGrow: 1}}>
              <Typography
                variant='body2'
                m='auto'
                color='text.secondary'>
                {option}
              </Typography>
            </Box>
            <LinearProgressWithLabel
              value={validOptionsPercentageStakes[index]} />
            <Button
              variant="outlined"
              size='small'
              color="error"
              sx={{fontSize: '10px', width: '50%'}}
            >Bet 0.5 SOL</Button>
          </Stack>
          <Divider light style={{width: '100%'}}/>
        </div>
      ))}
    </Stack>
  );
};

