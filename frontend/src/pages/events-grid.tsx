/* eslint-disable require-jsdoc */
import * as React from 'react';
import {useState, useContext} from 'react';
import EventCard from '../components/event-card/container';
import {EventMetadata} from '../types/event';
import {eventsApi} from '../api/eventsApi';
import Grid from '@mui/material/Grid';
import {UserContext} from '../context/user-context';
import {filterAndOrderEventsList} from '../utils/event-utils';

export default function EventsGrid(
    props: {type: 'active'|'past'|'future'|'my'},
) {
  const [events, setEvents] = useState<EventMetadata[]>([]);
  const userContext = useContext(UserContext);
  React.useEffect(() => {
    async function myUseEffect() {
      // @ts-ignore
      let list = await eventsApi.getAllEvents();
      if (list) {
        list = filterAndOrderEventsList(
            list, props.type, userContext.userEvents);
        setEvents(list);
      }
    }
    myUseEffect();
  }, []);
  return (
    <>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={5}
        direction="row"
        alignItems="stretch"
        justifyContent="flex-start"
      >
        {events.map((mEvent, mIndex) => (
          <Grid item key={mIndex} xs={12} sm={12} md={6} lg={4}
            sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}
          >
            <EventCard inputEvent={mEvent} userEvents={userContext.userEvents}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
