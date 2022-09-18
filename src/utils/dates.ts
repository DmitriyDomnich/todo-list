import moment from 'moment';

export const toTodoString = (date: Date) => {
  const momentDate = moment(date);
  return momentDate.format('LLL');
};
