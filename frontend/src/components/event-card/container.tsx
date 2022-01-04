/* eslint-disable require-jsdoc */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  CardActionArea,
  CardActions,
} from '@mui/material';

import {useWallet} from '@solana/wallet-adapter-react';
import React, {useState} from 'react';
import {EventMetadata} from '../../types/event';
import {eventsApi} from '../../api/eventsApi';
import EventCardOptionsAndActions from './options-and-actions';
import {UserEvent} from '../../types/user';

export default function EventCard(props: {
  inputEvent: EventMetadata,
  userEvents: UserEvent[],
}) {
  const {inputEvent, userEvents} = props;
  const [event, setEvent] = useState(inputEvent);
  const wallet = useWallet();
  React.useEffect(() => {
    async function myUseEffect() {
      try {
        // @ts-ignore
        const updatedEvent = await eventsApi.updateEvent(event, wallet);
        if (updatedEvent) {
          setEvent(updatedEvent);
        }
      } catch (err) {
        console.log(err);
      }
    }
    myUseEffect();
  }, []);
  return (
    <Card sx={{backgroundColor: '#00122e'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={event.eventImageUrl}
          alt="image"
          sx={{maxWidth: 'md'}}
        />
      </CardActionArea>
      <CardContent sx={{p: 1}}>
        <Typography gutterBottom variant="h5" component="div">
          {event.eventTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.eventQuestion}
        </Typography>
      </CardContent>
      <CardActions>
        <EventCardOptionsAndActions event={event} userEvents={userEvents}/>
      </CardActions>
    </Card>
  );
}
