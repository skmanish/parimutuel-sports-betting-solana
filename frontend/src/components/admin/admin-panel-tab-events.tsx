/* eslint-disable require-jsdoc */
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {EventMetadata} from '../../types/event';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {eventsApi} from '../../api';
import EventStatesAndActionsBox from './event-states-and-actions-paper';

function Row(props: { event: EventMetadata }) {
  const {event} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {event.eventTitle}
        </TableCell>
        <TableCell align="right">{event.eventStartTime}</TableCell>
        <TableCell align="right">{event.eventEndTime}</TableCell>
        <TableCell align="right">{event.eventResolveTime}</TableCell>
        <TableCell align="right">{event.eventVaultPubkey}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <EventStatesAndActionsBox event={event} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EventsTable() {
  const [events, setEvents] = React.useState<EventMetadata[]>([]);
  const getAllEvents = async () => {
    const events = await eventsApi.getAllEvents();
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
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="center">Start Time&nbsp;(GMT)</TableCell>
            <TableCell align="center">End Time&nbsp;(GMT)</TableCell>
            <TableCell align="center">Resolve Time&nbsp;(GMT)</TableCell>
            <TableCell align="center">Vault Pubkey</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <Row key={event.eventTitle} event={event} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

