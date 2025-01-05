import React, { useEffect, useState } from 'react';
import { getTime } from '@/utils/get-time';

export const Clock = () => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>{time}</div>;
};
