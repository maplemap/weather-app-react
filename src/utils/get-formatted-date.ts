export type TGetFormattedDate = (timestamp?: number) => string;

export const getFormattedDate: TGetFormattedDate = (
  timestamp = Date.now()
): string => {
  const now = new Date(timestamp);
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

  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();

  return `${dayOfWeek} ${month} ${day}`;
};
