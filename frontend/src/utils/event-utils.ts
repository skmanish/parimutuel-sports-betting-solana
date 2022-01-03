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

export {getValidOptions, getValidOptionsPercentageStakes};
