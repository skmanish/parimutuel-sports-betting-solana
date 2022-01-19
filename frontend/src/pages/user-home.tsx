/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Tab,
  Tabs,
  Divider,
} from '@mui/material';
import {WalletConnection} from '../components/connection';
import EventsGrid from './events-grid';
import AirdropButton from '../components/button-airdrop';
import ButtonStackSocial from '../components/buttons-stack-social';

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'id': `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function UserHomePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        display: 'flex',
        height: '100vh',
        width: '100vw'}}
    >
      <Stack sx={{display: 'flex'}}>
        <IconButton
          aria-label="fingerprint"
          color="success"
          sx={{mt: 2, mb: 4}}>
          <img src='/images/swager-logo-dark.svg' width='140px'/>
        </IconButton>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          indicatorColor='primary'
          textColor='primary'
          sx={{borderRight: 1, borderColor: 'divider'}}
        >
          <Tab label="Active Events" {...a11yProps(0)} />
          <Tab label="Upcoming" {...a11yProps(1)} />
          <Tab label="Past Events" {...a11yProps(2)} />
          <Divider light style={{width: '80%'}}
            sx={{m: 2, borderBottomWidth: 2}}/>
          <Tab label="My Events" {...a11yProps(4)} />
        </Tabs>
        <Box sx={{flexGrow: 1}}/>
        <ButtonStackSocial />
        <Typography
          color='primary'
          sx={{mb: 3}}
          align='center'>Ⓒ Swager</Typography>
      </Stack>
      <Stack sx={{flexGrow: 1}}>
        <Box
          sx={{height: '13vh', alignItems: 'center', pr: 4}}
          display='flex'
          flexDirection='row-reverse'>
          <WalletConnection />
          <AirdropButton />
        </Box>
        <Paper sx={{
          flexGrow: 1,
          backgroundColor: '#e4fafb',
          height: '87vh',
          overflow: 'auto',
          borderRadius: 5,
        }} elevation={3} >
          <TabPanel value={value} index={0}>
            <EventsGrid type='active'/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EventsGrid type='future'/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EventsGrid type='past'/>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <EventsGrid type='my'/>
          </TabPanel>
        </Paper>
      </Stack>
    </Box>
  );
}
