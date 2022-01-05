import {EventMetadata, EventState} from '../types/event';
import {UserEvent} from '../types/user';

const getValidOptions = (event: EventMetadata) => {
  let possibleOptions = [
    event.eventOption1,
    event.eventOption2,
    event.eventOption3,
    event.eventOption4,
    event.eventOption5,
  ];
  possibleOptions = possibleOptions.filter((value)=> value.length);
  return possibleOptions;
};

const getValidOptionsPercentageStakes = (event: EventMetadata) => {
  const validOptions = getValidOptions(event);
  const possibleStakes = [
    event.eventOption1Stakes,
    event.eventOption2Stakes,
    event.eventOption3Stakes,
    event.eventOption4Stakes,
    event.eventOption5Stakes,
  ];
  let sum: number = 0;
  for (let i = 0; i < validOptions.length; i++) {
    if (possibleStakes[i]) {
      sum = sum + (possibleStakes[i] as number);
    }
  }
  const ret = new Array(validOptions.length).fill(100/validOptions.length);
  if (sum != 0) {
    for (let i = 0; i < validOptions.length; i++) {
      ret[i] = (possibleStakes[i] as number)*100/sum;
    }
  }
  return ret;
};

const participatedEventFirst = (
    eventA: EventMetadata,
    eventB: EventMetadata,
    userEventIds: string[],
    elseOrder: (x: EventMetadata, y: EventMetadata) => number,
): number => {
  const isImportantEventA = userEventIds.includes(
    eventA.eventAccountPublicKeyBase58 as string);
  const isImportantEventB = userEventIds.includes(
    eventB.eventAccountPublicKeyBase58 as string);

  if (isImportantEventA && !isImportantEventB) {
    return -1;
  } else if (isImportantEventA && !isImportantEventB) {
    return 1;
  } else {
    return elseOrder(eventA, eventB);
  }
};

const filterAndOrderEventsList = (
    events: EventMetadata[],
    type: 'active'|'past'|'future'|'my',
    userEvents: UserEvent[],
): EventMetadata[] => {
  let returningEvents = events;
  const userEventIds = userEvents.map((userEvent) => userEvent.eventId);
  if (type == 'active') {
    // Filter, then order.
    returningEvents = events.filter(
        (event)=>event.eventState == EventState.STARTED);
    returningEvents.sort((eventA, eventB) => participatedEventFirst(
        eventA, eventB, userEventIds as string[],
        (x: EventMetadata, y: EventMetadata) => (
          new Date(x.eventEndTime).getTime() - new Date(
              y.eventEndTime).getTime())));
  } else if (type == 'past') {
    // Filter, then order.
    returningEvents = events.filter((event)=>(
      event.eventState == EventState.ENDED ||
        event.eventState == EventState.RESOLVED
    ));
    returningEvents.sort((eventA, eventB) => participatedEventFirst(
        eventA, eventB, userEventIds as string[],
        (x: EventMetadata, y: EventMetadata) => {
          return new Date(y.eventEndTime).getTime() - new Date(
              x.eventEndTime).getTime();
        }));
  } else if (type == 'future') {
    returningEvents = events.filter(
        (event)=>(event.eventState == EventState.CREATED));
    returningEvents.sort((eventA, eventB) => participatedEventFirst(
        eventA, eventB, userEventIds as string[],
        (x: EventMetadata, y: EventMetadata) => (
          new Date(x.eventStartTime).getTime() - new Date(
              y.eventStartTime).getTime())));
  } else if (type == 'my') {
    console.log('In My events:', events);
    console.log(userEventIds);
    returningEvents = events.filter(
        (event)=>(userEventIds.includes(event.eventAccountPublicKeyBase58)));
    // TODO: Implement better ordering
    returningEvents.sort((eventA, eventB) => (
      new Date(eventB.eventStartTime).getTime() - new Date(
          eventA.eventStartTime).getTime()));
  }
  return returningEvents; ;
};

export {
  getValidOptions,
  getValidOptionsPercentageStakes,
  filterAndOrderEventsList,
};
