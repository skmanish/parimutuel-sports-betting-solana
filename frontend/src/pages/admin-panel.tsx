/* eslint-disable require-jsdoc */
import axios from 'axios';
import * as React from 'react';
import AdminPanelTabs from '../components/admin/admin-panel-tabs';
import {EventMetadata} from '../types/event';

const createEvent = async (event: EventMetadata): Promise<string> => {
  await axios.post('/api/events/create', event).then((response) => {
    console.log(response.data);
  });
  return 'success';
};

const getAllEvents = async (): Promise<[EventMetadata]> => {
  const response = await axios.get('/api/events');
  return response.data as [EventMetadata];
};

export default function AdminPanelPage(props: any) {
  return (
    <>
      <AdminPanelTabs
        createEventHandler={createEvent}
        getEventsHandler={getAllEvents}/>
    </>
  );
}
