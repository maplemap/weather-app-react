import {useEffect, useState} from 'react';
import {getFormattedDate} from '@/utils/get-formatted-date';

export const CurrentDay = () => {
  const [date, setDate] = useState(getFormattedDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getFormattedDate());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>{date}</div>;
};
