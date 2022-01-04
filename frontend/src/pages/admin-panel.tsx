/* eslint-disable require-jsdoc */
import * as React from 'react';
import AdminPanelTabs from '../components/admin/admin-panel-tabs';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const adminTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function AdminPanelPage(props: any) {
  return (
    <ThemeProvider theme={adminTheme}>
      <AdminPanelTabs />
    </ThemeProvider>
  );
}
