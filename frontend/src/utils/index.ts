const getCurrentUTCTime = (): Date => {
  return new Date(Date.now() + (new Date()).getTimezoneOffset()*60000);
};
const isDateLateEnough = (
    date: Date,
    minTimeInMinutes: Number): boolean => {
  const diff = (date.valueOf() - getCurrentUTCTime().valueOf())/60000;
  return diff > minTimeInMinutes;
};
const getDateDiffMinutes = (startDate: Date, endDate: Date): Number => {
  return (endDate.valueOf() - startDate.valueOf())/60000;
};
export {getCurrentUTCTime, isDateLateEnough, getDateDiffMinutes};
