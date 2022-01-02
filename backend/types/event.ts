/* eslint-disable no-unused-vars */
/* IF YOU CHANGE THIS FILE, PLEASE ALSO CHANGE frontend/types/event.ts */

export enum EventState {
    DEAD = 0,
    CREATED = 1,
    STARTED = 2,
    ENDED = 3,
    RESOLVED = 4,
  };

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

