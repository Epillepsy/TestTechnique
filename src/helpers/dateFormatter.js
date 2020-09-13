import Moment from 'moment';

// Easier to test if in an individual file
const formatDate = (date) => {
  const format = 'DD/MM/YY';
  const currentMoment = new Moment();
  const pastMoment = new Moment(date);
  const duration = Moment.duration(currentMoment.diff(pastMoment));
  // Return relative date only if message is less than a week old
  if (duration._data && duration._data.days < 7) {
    return pastMoment.fromNow();
  }
  return Moment(date).format(format);
};

export default formatDate;
