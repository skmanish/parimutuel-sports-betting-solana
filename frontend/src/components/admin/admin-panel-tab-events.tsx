/* eslint-disable require-jsdoc */
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
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
import Typography from '@mui/material/Typography';

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
        <TableCell align="right">{event.eventVaultPubkey}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography align="center">
                <b>Question</b>: {event.eventQuestion}
              </Typography>
              <Typography align="center">
                <b>Options</b>: {event.eventOption1}, {event.eventOption2},
                {event.eventOption3}, {event.eventOption4},
                {event.eventOption5}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="center">Start Time&nbsp;(GMT)</TableCell>
            <TableCell align="center">End Time&nbsp;(GMT)</TableCell>
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

