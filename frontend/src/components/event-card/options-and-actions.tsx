/* eslint-disable require-jsdoc */
import {EventMetadata} from '../../types/event';
import {getValidOptions} from '../../utils/event-utils';
import {
  Typography,
  Divider,
  Stack,
} from '@mui/material';

export default function EventCardOptionsAndActions(
    props: {event: EventMetadata},
) {
  const {event} = props;
  return (
    <Stack spacing={1}>
      <Divider light style={{width: '100%'}}/>
      {getValidOptions(event).map((option, index)=>(
        <div key={index}>
          <Typography variant='body2' color='text.secondary'>
            {option}
          </Typography>
          <Divider light style={{width: '100%'}}/>
        </div>
      ))}
    </Stack>
  );
};

