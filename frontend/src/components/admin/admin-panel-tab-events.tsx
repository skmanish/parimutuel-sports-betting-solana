/* eslint-disable require-jsdoc */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {EventMetadata} from '../../types/event';


export default function EventsTable({
  getEventsHandler,
}: {
  getEventsHandler: () => Promise<[EventMetadata]>,
}) {
  const [events, setEvents] = React.useState<EventMetadata[]>([]);
  const getAllEvents = async () => {
    const events = await getEventsHandler();
    setEvents(events);
    console.log(events);
  };
  React.useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Start Time&nbsp;(g)</TableCell>
            <TableCell align="right">End Time&nbsp;(g)</TableCell>
            <TableCell align="right">Vault&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.eventTitle}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {event.eventTitle}
              </TableCell>
              <TableCell align="right">{event.eventQuestion}</TableCell>
              <TableCell align="right">{event.eventStartTime}</TableCell>
              <TableCell align="right">{event.eventEndTime}</TableCell>
              <TableCell align="right">{event.eventVaultPubkey}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

