/* eslint-disable require-jsdoc */
import {Wallet} from '@project-serum/anchor';
import {EventMetadata} from '../types/event';
import axios from 'axios';
import {
  createEventAccount,
  fetchEvent,
  setEventEnded,
  setEventResolved,
  setEventStarted,
} from '../utils/program-utils';

class eventsApi {
  static createEvent = async (
      event: EventMetadata,
      wallet: Wallet,
  ): Promise<string> => {
    const updatedEvent = await createEventAccount(event, wallet);
    await axios.post('/api/events/create', updatedEvent).then((response) => {
      console.log('Created event');
    });
    return 'success';
  };

  static getAllEvents = async (): Promise<EventMetadata[]> => {
    const response = await axios.get('/api/events');
    return response.data as EventMetadata[];
  };

  static startEvent = async (event: EventMetadata, wallet: Wallet) => {
    const updatedEvent = await setEventStarted(event, wallet);
    if (!updatedEvent) {
      return 'failure';
    }
    await axios.post('/api/events/update', updatedEvent).then((response) => {
      console.log(response.data);
    });
    return 'success';
  }

  static endEvent = async (event: EventMetadata, wallet: Wallet) => {
    const updatedEvent = await setEventEnded(event, wallet);
    if (!updatedEvent) {
      return 'failure';
    }
    await axios.post('/api/events/update', updatedEvent).then((response) => {
      console.log(response.data);
    });
    return 'success';
  }

  static resolveEvent = async (
      event: EventMetadata,
      wallet: Wallet,
      correctOptionNumber: Number, // is 0-indexed.
  ) => {
    const updatedEvent = await setEventResolved(
        event,
        wallet,
        correctOptionNumber,
    );
    if (!updatedEvent) {
      return 'failure';
    }
    await axios.post('/api/events/update', updatedEvent).then((response) => {
      console.log(response.data);
    });
    return 'success';
  }

  static updateEvent = async (event: EventMetadata, wallet: Wallet) => {
    const updatedEvent = await fetchEvent(
        event,
        wallet,
    );
    if (!updatedEvent) {
      return;
    }
    await axios.post('/api/events/update', updatedEvent).then((response) => {
    });
    return updatedEvent;
  }
}

export {eventsApi};
