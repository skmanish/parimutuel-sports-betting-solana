/* eslint-disable require-jsdoc */
import * as React from 'react';
import Box from '@mui/material/Box';
import {Formik, Field} from 'formik';
import {TextField} from 'formik-mui';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DateTimePicker} from 'formik-mui-lab';
import LinearProgress from '@mui/material/LinearProgress';
import {
  getCurrentUTCTime,
  getDateDiffMinutes,
  isDateLateEnough} from '../../utils';
import {EventMetadata, isOptionSequenceValid} from '../../types/event';


const validateValues = (values: EventMetadata) => {
  const errors: Partial<EventMetadata> = {};
  if (!isDateLateEnough(values.eventStartTime, 30)) {
    errors.eventTitle = 'Event should start after atleast 30 mins';
  }
  if (getDateDiffMinutes(values.eventStartTime, values.eventEndTime) < 30) {
    errors.eventTitle = 'Event should happen for atleast 30 mins';
  }
  if (values.eventTitle.length < 1 || values.eventTitle.length >= 100) {
    errors.eventTitle = 'Length should be in 1-100 characters';
  }
  if (values.eventQuestion.length < 1 ||
    values.eventQuestion.length >= 1000) {
    errors.eventQuestion = 'Length should be in 1-1000 characters';
  }
  if (values.eventVaultPubkey.length < 10 ||
    values.eventVaultPubkey.length >= 100) {
    errors.eventVaultPubkey = 'Length should be in 10-100 characters';
  }
  if (values.eventVaultPubkey.length < 10 ||
    values.eventVaultPubkey.length >= 100) {
    errors.eventVaultPubkey = 'Length should be in 10-100 characters';
  }
  if (values.eventOption1.trim() != values.eventOption1) {
    errors.eventOption1 = 'Remove white space';
  }
  if (values.eventOption2.trim() != values.eventOption2) {
    errors.eventOption2 = 'Remove white space';
  }
  if (values.eventOption3.trim() != values.eventOption3) {
    errors.eventOption3 = 'Remove white space';
  }
  if (values.eventOption4.trim() != values.eventOption4) {
    errors.eventOption4 = 'Remove white space';
  }
  if (values.eventOption5.trim() != values.eventOption5) {
    errors.eventOption5 = 'Remove white space';
  }
  if (!isOptionSequenceValid(values)) {
    errors.eventOption1 = 'Invalid options';
  }
  return errors;
};

export default function CreateEventForm() {
  return (
    <Box
      display="flex"
      component="form"
      sx={{
        '& > :not(style)': {p: 2, width: 'md'},
      }}
      alignItems="center"
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Formik
          initialValues={{
            eventTitle: '',
            eventQuestion: '',
            eventVaultPubkey: '',
            eventStartTime: getCurrentUTCTime(),
            eventEndTime: getCurrentUTCTime(),
            eventOption1: '',
            eventOption2: '',
            eventOption3: '',
            eventOption4: '',
            eventOption5: '',
          }}
          validate={validateValues}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }} >
          {({submitForm, isSubmitting}) => (
            <Stack spacing={2} m="auto">
              <Field
                component={TextField}
                name="eventTitle"
                label="Event title"
                variant="outlined"
              />
              <Stack direction="row" spacing={2}>
                <Field
                  component={DateTimePicker}
                  name="eventStartTime"
                  label="Start Time (GMT)"
                />
                <Field
                  component={DateTimePicker}
                  name="eventEndTime"
                  label="End Time (GMT)"
                />
              </Stack>
              <Field
                component={TextField}
                name="eventQuestion"
                label="Event Question"
                variant="outlined"
                multiline
              />
              <Field
                component={TextField}
                name="eventVaultPubkey"
                label="Event Vault PubKey"
                variant="outlined"
              />
              <Stack direction="row" spacing={2}>
                <Field
                  component={TextField}
                  name="eventOption1"
                  label="Option 1"
                  variant="outlined"
                  required
                  sx={{width: 100}}
                />
                <Field
                  component={TextField}
                  name="eventOption2"
                  label="Option 2"
                  variant="outlined"
                  required
                  sx={{width: 100}}
                />
                <Field
                  component={TextField}
                  name="eventOption3"
                  label="Option 3"
                  variant="outlined"
                  sx={{width: 100}}
                />
                <Field
                  component={TextField}
                  name="eventOption4"
                  label="Option 4"
                  variant="outlined"
                  sx={{width: 100}}
                />
                <Field
                  component={TextField}
                  name="eventOption5"
                  label="Option 5"
                  variant="outlined"
                  sx={{width: 100}}
                />
              </Stack>
              {isSubmitting && <LinearProgress /> }
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={isSubmitting}>
                    Create
              </Button>
            </Stack>
          )}
        </Formik>
      </LocalizationProvider>
    </Box>
  );
}
