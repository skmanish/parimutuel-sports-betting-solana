/* eslint-disable require-jsdoc */
import * as React from 'react';
import {useState, useContext} from 'react';
import EventCard from '../components/event-card/container';
import {EventMetadata} from '../types/event';
import {eventsApi} from '../api/eventsApi';
import Grid from '@mui/material/Grid';
import {UserContext} from '../context/user-context';

export default function EventsGrid(props: {type: 'active'|'past'|'my'}) {
  const [events, setEvents] = useState<EventMetadata[]>([]);
  const userContext = useContext(UserContext);
  console.log('In User page', userContext);
  React.useEffect(() => {
    async function myUseEffect() {
      // @ts-ignore
      setEvents(await eventsApi.getAllEvents());
    }
    myUseEffect();
  }, []);
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-evenly"
        sx={{m: 0}}
      >
        {events.map((mEvent, mIndex) => (
          <Grid item key={mIndex} xs={9} sm={5} md={4}>
            <EventCard inputEvent={mEvent} userEvents={userContext.userEvents}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
