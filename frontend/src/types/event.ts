/* IF YOU CHANGE THIS FILE, PLEASE ALSO CHANGE backend/types/event.ts */

export type EventMetadata = {
    eventTitle: string;
    eventQuestion: string;
    eventVaultPubkey: string;
    eventStartTime: Date;
    eventEndTime: Date;
    eventOption1: string;
    eventOption2: string;
    eventOption3: string;
    eventOption4: string;
    eventOption5: string;
}

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
