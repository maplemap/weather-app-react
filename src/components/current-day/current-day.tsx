import {useEffect, useState} from 'react';

export const CurrentDay = () => {
  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getCurrentDate());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>{date}</div>;
};

const getCurrentDate = (): string => {
  const now = new Date();
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

  return `${dayOfWeek} ${month}.${day}`;
};
