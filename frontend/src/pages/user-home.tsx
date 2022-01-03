/* eslint-disable require-jsdoc */
import * as React from 'react';
import {useState} from 'react';
import EventCard from '../components/event-card/container';
import ResponsiveAppBar from '../components/responsive-appbar';
import {EventMetadata} from '../types/event';
import {eventsApi} from '../api';
import Grid from '@mui/material/Grid';

export default function UserHomePage(props: any) {
  const [events, setEvents] = useState<EventMetadata[]>([]);
  React.useEffect(() => {
    async function myUseEffect() {
      // @ts-ignore
      setEvents(await eventsApi.getAllEvents());
    }
    myUseEffect();
  }, []);
  return (
    <>
      <ResponsiveAppBar />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={0}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-evenly"
        sx={{mt: 1}}
      >
        {events.map((mEvent, mIndex) => (
          <Grid item key={mIndex} xs={3}>
            <EventCard inputEvent={mEvent}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
