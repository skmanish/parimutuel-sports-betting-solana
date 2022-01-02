/* eslint-disable no-unused-vars */

import {PublicKey} from '@solana/web3.js';

export enum EventState {
  CREATED = 0,
  STARTED = 1,
  ENDED = 2,
  RESOLVED = 3,
};

/* IF YOU CHANGE THIS, PLEASE ALSO CHANGE in
   programs/choose-option/src/event.rs.
*/
export type FetchedEventAccountType = {
  authority: PublicKey,
  vault: PublicKey,
  state: EventState,
  option1BalanceCents: Number,
  option2BalanceCents: Number,
  option3BalanceCents: Number,
  option4BalanceCents: Number,
  option5BalanceCents: Number,
  correctOptionNumber: Number,
}

/* IF YOU CHANGE THIS, PLEASE ALSO CHANGE backend/types/event.ts */
export type EventMetadata = {
  eventAccountPublicKeyBase58?: string;
  eventAccountSecretKeyByteArray?: string;
  eventAuthorityPublicKeyBase58?: string;
  eventState?: EventState;

  eventTitle: string;
  eventQuestion: string;
  eventVaultPubkey: string;
  eventStartTime: Date;
  eventEndTime: Date;
  eventResolveTime: Date;
  eventImageUrl?: string;

  eventOption1: string;
  eventOption2: string;
  eventOption3: string;
  eventOption4: string;
  eventOption5: string;

  eventOption1Stakes?: Number,
  eventOption2Stakes?: Number,
  eventOption3Stakes?: Number,
  eventOption4Stakes?: Number,
  eventOption5Stakes?: Number,

  correctOptionNumber?: Number,
};

const isOptionSequenceValid = (event: EventMetadata): boolean => {
  if (event.eventOption1.length == 0) {
    return false;
  }
  if (event.eventOption2.length == 0) {
    return false;
  }
  if (event.eventOption3.length == 0 && event.eventOption4.length != 0) {
    return false;
  }
  if (event.eventOption4.length == 0 && event.eventOption5.length != 0) {
    return false;
  }
  return true;
};
export {isOptionSequenceValid};
