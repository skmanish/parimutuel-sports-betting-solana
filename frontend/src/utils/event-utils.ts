import {EventMetadata} from '../types/event';

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

export {getValidOptions};
