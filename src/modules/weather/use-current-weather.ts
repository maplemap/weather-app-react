import { useCallback, useEffect, useState } from 'react';
import { Weather } from '@/modules/weather/types/weather';
import { useAppContext } from '@/services/store/provider';
import { useFetchCurrentWeather } from './api/adapters';

const DATA_UPDATE_INTERVAL = 5 * 60 * 1000;

export type TUseCurrentWeather = (city: string) => {
  currentWeather: Weather | null;
  isLoading: boolean;
  lastDataUpdate: Date;
};

export const useCurrentWeather: TUseCurrentWeather = (city) => {
  const { units } = useAppContext();
  const { data, getData, isLoading } = useFetchCurrentWeather(city, units);
  const [lastDataUpdate, setLastDataUpdate] = useState<Date>(new Date());

  const getCurrentData = useCallback(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  const updateLastDataUpdate = useCallback(() => {
    setLastDataUpdate(new Date());
  }, []);

  useEffect(() => {
    getCurrentData();
    updateLastDataUpdate();
  }, [getCurrentData, units, updateLastDataUpdate]);

  useEffect(() => {
    getCurrentData();

    const intervalId = setInterval(() => {
      getCurrentData();

      updateLastDataUpdate();
    }, DATA_UPDATE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [getData, getCurrentData, updateLastDataUpdate]);

  return {
    currentWeather: data,
    isLoading,
    getData,
    lastDataUpdate,
  };
};
