import { useEffect, useState } from 'react';
import { getFormattedDate } from '@/utils/get-formatted-date';

const UPDATE_INTERVAL = 60 * 1000;

export const CurrentDay = () => {
  const [date, setDate] = useState(getFormattedDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getFormattedDate());
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return <div>{date}</div>;
};
