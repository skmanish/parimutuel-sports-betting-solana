/* eslint-disable require-jsdoc */
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreateEventForm from './admin-panel-tab-create-event';
import EventsTable from './admin-panel-tab-events';
import {EventMetadata} from '../../types/event';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (<>{children}</>)}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AdminPanelTabs({
  createEventHandler,
  getEventsHandler,
}: {
  createEventHandler: (event: EventMetadata) => Promise<string>,
  getEventsHandler: () => Promise<[EventMetadata]>,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="All Events" {...a11yProps(0)} />
          <Tab label="Modify Event" {...a11yProps(1)} />
          <Tab label="Create event" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EventsTable
          getEventsHandler={getEventsHandler}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Modify event
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreateEventForm createEventHandler={createEventHandler}/>
      </TabPanel>
    </Box>
  );
}
