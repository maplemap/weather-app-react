export type GetFormattedDate = (timestamp?: number) => string;

export const getFormattedDate: GetFormattedDate = (timestamp): string => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${dayOfWeek} ${month} ${day}`;
};
