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
        rowSpacing={2}
        columnSpacing={2}
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {events.map((mEvent, mIndex) => (
          <Grid item key={mIndex} xs={9} sm={8} md={4}>
            <EventCard inputEvent={mEvent} userEvents={userContext.userEvents}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
