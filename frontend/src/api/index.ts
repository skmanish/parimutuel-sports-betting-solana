import {Wallet} from '@project-serum/anchor';
import {EventMetadata} from '../types/event';
import axios from 'axios';
import {createEventAccount} from '../utils/program-utils';

const createEvent = async (
    event: EventMetadata,
    wallet: Wallet,
): Promise<string> => {
  createEventAccount(event, wallet);
  // await axios.post('/api/events/create', event).then((response) => {
  //   console.log(response.data);
  // });
  return 'success';
};
const getAllEvents = async (): Promise<[EventMetadata]> => {
  const response = await axios.get('/api/events');
  return response.data as [EventMetadata];
};

export {createEvent, getAllEvents};
