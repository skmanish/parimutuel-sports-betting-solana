/* eslint-disable require-jsdoc */
import * as React from 'react';
import {createEvent, getAllEvents} from '../api';
import AdminPanelTabs from '../components/admin/admin-panel-tabs';

export default function AdminPanelPage(props: any) {
  return (
    <>
      <AdminPanelTabs
        createEventHandler={createEvent}
        getEventsHandler={getAllEvents}/>
    </>
  );
}
